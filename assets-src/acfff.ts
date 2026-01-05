import "./css/acfff.css";

("use strict");

import { autofill } from "./js/autofill.js";

import { register } from "./js/FrontendFormElement.js";
import FileInput from "./js/FileInput.js";
import MaxLength from "./js/MaxLength.js";
import DropZone from "./js/DropZone.js";
import feather from "feather-icons";

import autosize from "autosize";

import type { ACFField, ACFRepeaterData } from "./types";
import { nextTick } from "./js/helpers.js";

/**
 * Public API on the window
 */
window.acfff = {
  autofill,
};

(($, acf) => {
  if (typeof acf === "undefined") {
    console.error("The global acf object is not defined");
    return;
  }

  register();
  setup();

  /**
   * Setup global acf functions and hooks
   */
  async function setup() {
    // add initialized class to fields on initialization
    acf.addAction("new_field", async (field) => {
      if (field.$el.hasClass("acfff-initialized")) return;
      field.$el.addClass("acfff-initialized");
    });

    // acf.addAction("new_field/type=image", (field) => {
    //   new DropZone(field);
    // });

    // acf.addAction("new_field/type=text", (field) => {
    //   console.log(field);
    // });

    acf.addAction("new_field/type=textarea", (field) => {
      initAutosize(field);
    });

    // acf.addAction("new_field/type=file", (field) => {
    //   new FileInput(field);
    // });

    // functions
    acf.showSpinner = function () {
      $("html").addClass("acfff-loading");
    };
    acf.hideSpinner = function () {
      $("html").removeClass("acfff-loading");
    };

    acf.addAction("remove", ($el) => {
      const $repeater = $el.closest(".acf-repeater");
      $el.remove();
      adjustRepeater($repeater, "remove");
    });

    acf.addAction("append", ($el) => {
      adjustRepeater($el.closest(".acf-repeater"), "append");
      adjustRepeater($el.find(".acf-repeater"), "append");
    });
  }

  /**
   * Initialize autosize
   */
  function initAutosize(field: ACFField) {
    if (field.get("type") !== "textarea") return;

    field
      .$input()
      .each((i, el) => {
        autosize(el);
      })
      .on("autosize:resized", function () {
        $(window).trigger("resize");
      });
  }

  /**
   * Tweaks for the ACF repeater field
   */
  function adjustRepeater($repeater: JQuery, action: "append" | "remove") {
    if (!$repeater.length) {
      return;
    }
    console.log($repeater);
    const plusIcon = feather.icons["plus-circle"].toSvg();
    const minusIcon = feather.icons["minus-circle"].toSvg();

    // adjust disabled class
    const repeater = acf.get_data<ACFRepeaterData>($repeater);
    const $rows = $repeater.find(".acf-row:not(.acf-clone)");
    const $lastRow = $rows.last();
    const $addRow = $lastRow.find('[data-event="add-row"]');

    $repeater.find('[data-event="add-row"]').html(plusIcon);
    $repeater.find('[data-event="remove-row"]').html(minusIcon);
    $repeater.find('[data-event="duplicate-row"]').remove();
    $repeater.find('.acf-row-handle [data-event="add-row"]').remove();


    $addRow.toggleClass(
      "acff:disabled",
      repeater.max > 0 && $rows.length >= repeater.max
    );

    if (action === "append") focusFirstInput($lastRow);

    $(document).trigger("acfff:form-resized");
  }

  /**
   * Focus the first input inside a jQuery element
   */
  async function focusFirstInput($el: JQuery) {
    await nextTick();

    $el.find<HTMLInputElement>("input,select,textarea")[0]?.focus();
  }
})(jQuery, window.acf);
