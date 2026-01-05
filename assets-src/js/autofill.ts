import { createLogger } from "./helpers.js";

const $ = window.jQuery;

export function autofill(values: {}, debug: boolean = true) {
  const $forms = $(".acf-form");
  const logger = debug ? createLogger() : undefined;

  if (!$forms.length) {
    return false;
  }

  if (typeof values !== "object") {
    logger?.warn("[acfff] please provide a values object");
    return false;
  }

  logger?.log("[acfff] Autofilling form...");

  $forms.each((i, el) => {
    let $form = $(el);

    $form.find(".fill-password-suggestion").trigger("click");

    fillFields($form, values);

    $form.trigger("acfff:autofill");

    el.scrollIntoView({ behavior: "smooth" });
  });

  function fillFields($wrap: JQuery<HTMLElement>, values: Record<string, any>) {
    $.each(values, (key, value) => {
      const $fields = $wrap.find(`.acf-field[data-name="${key}"]`);

      if (!$fields.length) {
        return true;
      }

      $fields.each((i: number, el: HTMLElement) => {
        let $field = $(el);

        if (typeof value === "object" && !(value instanceof Date)) {
          $.each(value, (key, val) => {
            if (typeof key === "number") {
              if (key > 0) {
                $field.find('[data-event="add-row"]:last').trigger("click");
              }
              fillFields($field.find(".acf-fields").eq(key), val);
            } else {
              fillFields($field, val);
            }
          });
        } else {
          let $inputs = $field.find("input, select, checkbox, textarea");
          fillField($inputs, value, key);
        }
      });
    });
  }

  function fillField(
    $inputs: JQuery<HTMLElement>,
    value: any,
    fieldName: string,
  ) {
    $inputs.each((i: number, el: HTMLElement) => {
      let $input = $(el);
      let type = $input.attr("type");
      let currentValue =
        type === "checkbox" ? $input.prop("checked") : $input.val();

      let debugInfo = {
        $input: el,
        currentValue: currentValue,
        fieldName: fieldName,
        autofillValue: value,
      };

      if (
        type === "hidden" ||
        type === "file" ||
        $input.hasClass("select2-search__field") ||
        $input.parents(".acf-clone").length
      ) {
        return;
      }

      if (currentValue) {
        console.log("[acfff] Field already has a value, skipping:", debugInfo);

        return;
      }

      switch (type) {
        case "checkbox":
          $input.prop("checked", value).trigger("change");
          return;
      }

      if ($input.hasClass("hasDatepicker")) {
        // @ts-ignore ts doesn't know about the datepicker
        $input.datepicker("setDate", value).trigger("change");
        return;
      }

      // default
      $input.val(value).trigger("change");
    });
  }
}
