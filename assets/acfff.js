"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.pnpm/autosize@4.0.4/node_modules/autosize/dist/autosize.js
  var require_autosize = __commonJS({
    "node_modules/.pnpm/autosize@4.0.4/node_modules/autosize/dist/autosize.js"(exports, module) {
      (function(global, factory) {
        if (typeof define === "function" && define.amd) {
          define(["module", "exports"], factory);
        } else if (typeof exports !== "undefined") {
          factory(module, exports);
        } else {
          var mod = {
            exports: {}
          };
          factory(mod, mod.exports);
          global.autosize = mod.exports;
        }
      })(exports, function(module2, exports2) {
        "use strict";
        var map = typeof Map === "function" ? /* @__PURE__ */ new Map() : /* @__PURE__ */ (function() {
          var keys = [];
          var values = [];
          return {
            has: function has(key) {
              return keys.indexOf(key) > -1;
            },
            get: function get(key) {
              return values[keys.indexOf(key)];
            },
            set: function set(key, value) {
              if (keys.indexOf(key) === -1) {
                keys.push(key);
                values.push(value);
              }
            },
            delete: function _delete(key) {
              var index = keys.indexOf(key);
              if (index > -1) {
                keys.splice(index, 1);
                values.splice(index, 1);
              }
            }
          };
        })();
        var createEvent = function createEvent2(name) {
          return new Event(name, { bubbles: true });
        };
        try {
          new Event("test");
        } catch (e) {
          createEvent = function createEvent2(name) {
            var evt = document.createEvent("Event");
            evt.initEvent(name, true, false);
            return evt;
          };
        }
        function assign(ta) {
          if (!ta || !ta.nodeName || ta.nodeName !== "TEXTAREA" || map.has(ta)) return;
          var heightOffset = null;
          var clientWidth = null;
          var cachedHeight = null;
          function init() {
            var style = window.getComputedStyle(ta, null);
            if (style.resize === "vertical") {
              ta.style.resize = "none";
            } else if (style.resize === "both") {
              ta.style.resize = "horizontal";
            }
            if (style.boxSizing === "content-box") {
              heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
            } else {
              heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
            }
            if (isNaN(heightOffset)) {
              heightOffset = 0;
            }
            update2();
          }
          function changeOverflow(value) {
            {
              var width = ta.style.width;
              ta.style.width = "0px";
              ta.offsetWidth;
              ta.style.width = width;
            }
            ta.style.overflowY = value;
          }
          function getParentOverflows(el) {
            var arr = [];
            while (el && el.parentNode && el.parentNode instanceof Element) {
              if (el.parentNode.scrollTop) {
                arr.push({
                  node: el.parentNode,
                  scrollTop: el.parentNode.scrollTop
                });
              }
              el = el.parentNode;
            }
            return arr;
          }
          function resize() {
            if (ta.scrollHeight === 0) {
              return;
            }
            var overflows = getParentOverflows(ta);
            var docTop = document.documentElement && document.documentElement.scrollTop;
            ta.style.height = "";
            ta.style.height = ta.scrollHeight + heightOffset + "px";
            clientWidth = ta.clientWidth;
            overflows.forEach(function(el) {
              el.node.scrollTop = el.scrollTop;
            });
            if (docTop) {
              document.documentElement.scrollTop = docTop;
            }
          }
          function update2() {
            resize();
            var styleHeight = Math.round(parseFloat(ta.style.height));
            var computed = window.getComputedStyle(ta, null);
            var actualHeight = computed.boxSizing === "content-box" ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;
            if (actualHeight < styleHeight) {
              if (computed.overflowY === "hidden") {
                changeOverflow("scroll");
                resize();
                actualHeight = computed.boxSizing === "content-box" ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
              }
            } else {
              if (computed.overflowY !== "hidden") {
                changeOverflow("hidden");
                resize();
                actualHeight = computed.boxSizing === "content-box" ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
              }
            }
            if (cachedHeight !== actualHeight) {
              cachedHeight = actualHeight;
              var evt = createEvent("autosize:resized");
              try {
                ta.dispatchEvent(evt);
              } catch (err) {
              }
            }
          }
          var pageResize = function pageResize2() {
            if (ta.clientWidth !== clientWidth) {
              update2();
            }
          };
          var destroy2 = function(style) {
            window.removeEventListener("resize", pageResize, false);
            ta.removeEventListener("input", update2, false);
            ta.removeEventListener("keyup", update2, false);
            ta.removeEventListener("autosize:destroy", destroy2, false);
            ta.removeEventListener("autosize:update", update2, false);
            Object.keys(style).forEach(function(key) {
              ta.style[key] = style[key];
            });
            map.delete(ta);
          }.bind(ta, {
            height: ta.style.height,
            resize: ta.style.resize,
            overflowY: ta.style.overflowY,
            overflowX: ta.style.overflowX,
            wordWrap: ta.style.wordWrap
          });
          ta.addEventListener("autosize:destroy", destroy2, false);
          if ("onpropertychange" in ta && "oninput" in ta) {
            ta.addEventListener("keyup", update2, false);
          }
          window.addEventListener("resize", pageResize, false);
          ta.addEventListener("input", update2, false);
          ta.addEventListener("autosize:update", update2, false);
          ta.style.overflowX = "hidden";
          ta.style.wordWrap = "break-word";
          map.set(ta, {
            destroy: destroy2,
            update: update2
          });
          init();
        }
        function destroy(ta) {
          var methods = map.get(ta);
          if (methods) {
            methods.destroy();
          }
        }
        function update(ta) {
          var methods = map.get(ta);
          if (methods) {
            methods.update();
          }
        }
        var autosize2 = null;
        if (typeof window === "undefined" || typeof window.getComputedStyle !== "function") {
          autosize2 = function autosize3(el) {
            return el;
          };
          autosize2.destroy = function(el) {
            return el;
          };
          autosize2.update = function(el) {
            return el;
          };
        } else {
          autosize2 = function autosize3(el, options) {
            if (el) {
              Array.prototype.forEach.call(el.length ? el : [el], function(x) {
                return assign(x, options);
              });
            }
            return el;
          };
          autosize2.destroy = function(el) {
            if (el) {
              Array.prototype.forEach.call(el.length ? el : [el], destroy);
            }
            return el;
          };
          autosize2.update = function(el) {
            if (el) {
              Array.prototype.forEach.call(el.length ? el : [el], update);
            }
            return el;
          };
        }
        exports2.default = autosize2;
        module2.exports = exports2["default"];
      });
    }
  });

  // assets-src/js/autofill.ts
  var $ = window.jQuery;
  function autofill(id = 0) {
    var _a;
    let $forms = $(".acf-form");
    if (!$forms.length) {
      return false;
    }
    const values = (_a = window.acfffAutofillValues) == null ? void 0 : _a[id];
    if (typeof values !== "object") {
      console.warn("[acfff] window.acfffAutofillValues is not defined");
      return false;
    }
    console.log("[acfff] Autofilling form...");
    $forms.each((i, el) => {
      let $form = $(el);
      $form.find(".fill-password-suggestion").trigger("click");
      fillFields($form, values);
      $form.trigger("acfff:autofill");
      el.scrollIntoView({ behavior: "smooth" });
    });
    function fillFields($wrap, values2) {
      $.each(values2, (key, value) => {
        const $fields = $wrap.find(`.acf-field[data-name="${key}"]`);
        if (!$fields.length) {
          return true;
        }
        $fields.each((i, el) => {
          let $field = $(el);
          if (typeof value === "object" && !(value instanceof Date)) {
            $.each(value, (key2, val) => {
              if (typeof key2 === "number") {
                if (key2 > 0) {
                  $field.find('[data-event="add-row"]:last').trigger("click");
                }
                fillFields($field.find(".acf-fields").eq(key2), val);
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
    function fillField($inputs, value, fieldName) {
      $inputs.each((i, el) => {
        let $input = $(el);
        let type = $input.attr("type");
        let currentValue = type === "checkbox" ? $input.prop("checked") : $input.val();
        let debugInfo = {
          $input: el,
          currentValue,
          fieldName,
          autofillValue: value
        };
        if (type === "hidden" || type === "file" || $input.hasClass("select2-search__field") || $input.parents(".acf-clone").length) {
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
          $input.datepicker("setDate", value).trigger("change");
          return;
        }
        $input.val(value).trigger("change");
      });
    }
  }

  // node_modules/.pnpm/es-toolkit@1.43.0/node_modules/es-toolkit/dist/predicate/isPlainObject.mjs
  function isPlainObject(value) {
    if (!value || typeof value !== "object") {
      return false;
    }
    const proto = Object.getPrototypeOf(value);
    const hasObjectPrototype = proto === null || proto === Object.prototype || Object.getPrototypeOf(proto) === null;
    if (!hasObjectPrototype) {
      return false;
    }
    return Object.prototype.toString.call(value) === "[object Object]";
  }

  // node_modules/.pnpm/es-toolkit@1.43.0/node_modules/es-toolkit/dist/_internal/isUnsafeProperty.mjs
  function isUnsafeProperty(key) {
    return key === "__proto__";
  }

  // node_modules/.pnpm/es-toolkit@1.43.0/node_modules/es-toolkit/dist/object/merge.mjs
  function merge(target, source) {
    const sourceKeys = Object.keys(source);
    for (let i = 0; i < sourceKeys.length; i++) {
      const key = sourceKeys[i];
      if (isUnsafeProperty(key)) {
        continue;
      }
      const sourceValue = source[key];
      const targetValue = target[key];
      if (isMergeableValue(sourceValue) && isMergeableValue(targetValue)) {
        target[key] = merge(targetValue, sourceValue);
      } else if (Array.isArray(sourceValue)) {
        target[key] = merge([], sourceValue);
      } else if (isPlainObject(sourceValue)) {
        target[key] = merge({}, sourceValue);
      } else if (targetValue === void 0 || sourceValue !== void 0) {
        target[key] = sourceValue;
      }
    }
    return target;
  }
  function isMergeableValue(value) {
    return isPlainObject(value) || Array.isArray(value);
  }

  // node_modules/.pnpm/es-toolkit@1.43.0/node_modules/es-toolkit/dist/function/debounce.mjs
  function debounce(func, debounceMs, { signal, edges } = {}) {
    let pendingThis = void 0;
    let pendingArgs = null;
    const leading = edges != null && edges.includes("leading");
    const trailing = edges == null || edges.includes("trailing");
    const invoke = () => {
      if (pendingArgs !== null) {
        func.apply(pendingThis, pendingArgs);
        pendingThis = void 0;
        pendingArgs = null;
      }
    };
    const onTimerEnd = () => {
      if (trailing) {
        invoke();
      }
      cancel();
    };
    let timeoutId = null;
    const schedule = () => {
      if (timeoutId != null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        timeoutId = null;
        onTimerEnd();
      }, debounceMs);
    };
    const cancelTimer = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
    const cancel = () => {
      cancelTimer();
      pendingThis = void 0;
      pendingArgs = null;
    };
    const flush = () => {
      invoke();
    };
    const debounced = function(...args) {
      if (signal == null ? void 0 : signal.aborted) {
        return;
      }
      pendingThis = this;
      pendingArgs = args;
      const isFirstCall = timeoutId == null;
      schedule();
      if (leading && isFirstCall) {
        invoke();
      }
    };
    debounced.schedule = schedule;
    debounced.cancel = cancel;
    debounced.flush = flush;
    signal == null ? void 0 : signal.addEventListener("abort", cancel, { once: true });
    return debounced;
  }

  // assets-src/js/helpers.ts
  var prefix = "acfff";
  function nextTick() {
    return new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
  }
  function createLogger() {
    const style = [
      "background: linear-gradient(to right, #a960ee, #f78ed4)",
      "color: white",
      "padding-inline: 4px",
      "border-radius: 2px",
      "font-family: monospace"
    ].join(";");
    return {
      log: (...args) => console.log(`%c${prefix}`, style, ...args),
      warn: (...args) => console.warn(`%c${prefix}`, style, ...args),
      error: (...args) => console.error(`%c${prefix}`, style, ...args)
    };
  }

  // assets-src/js/FrontendForm.ts
  var $2 = window.jQuery;
  var acf = window.acf;
  var defaults = {
    debug: false,
    ajax: {
      enabled: true,
      waitAfterSubmit: 50,
      submitOnChange: false
    }
  };
  var FrontendForm = class {
    constructor(el, options = {}) {
      /**
       * Run setup
       */
      this.initialize = async () => {
        if (this.$form.hasClass("acfff-initialized")) {
          return;
        }
        this.$form.addClass("acfff-initialized");
        acf.doAction("append", this.$form);
        acf.set(
          "post_id",
          this.$form.find("#_acf_post_id").val()
        );
        acf.set("screen", "acf_form");
        acf.set("validation", true);
        acf.validation.disable();
        this.$form.on("submit", (e) => {
          e.preventDefault();
          const validator = this.validate({
            reset: true,
            loading: () => {
              var _a;
              (_a = this.logger) == null ? void 0 : _a.log("validation loading...");
            },
            failure: () => {
              var _a;
              (_a = this.logger) == null ? void 0 : _a.error("validation error", validator.getErrors());
            },
            success: ($form) => {
              var _a;
              (_a = this.logger) == null ? void 0 : _a.log("validation success \u2013 submitting form...", $form[0]);
              this.submit();
            }
          });
        });
        this.createAjaxResponse();
        this.customizeForm();
        this.watchFields();
        this.hideConditionalFields();
      };
      /**
       * Validate this form
       */
      this.validate = (options = {}) => {
        const $form = this.$form;
        acf.validateForm(__spreadValues({ form: $form }, options));
        return $form.data("acf");
      };
      /**
       * Submit this form via AJAX
       */
      this.submit = () => {
        var _a;
        if (!this.options.ajax.enabled) {
          this.$form[0].submit();
          return;
        }
        acf.unload.enable();
        const formData = this.getFormData();
        acf.lockForm(this.$form);
        this.$form.addClass("acfff-locked");
        (_a = this.logger) == null ? void 0 : _a.log("Submitting form via AJAX...");
        $2.ajax({
          url: window.location.href,
          method: "post",
          data: formData,
          cache: false,
          processData: false,
          contentType: false
        }).done((response) => {
          var _a2;
          (_a2 = this.logger) == null ? void 0 : _a2.log("Form submitted via AJAX!", this.$form[0]);
          this.handleAjaxResponse(response);
        });
      };
      this.triggerDomEvent = (name, details) => {
        var _a;
        (_a = this.logger) == null ? void 0 : _a.log("triggering dom event:", name, details);
        this.$form.trigger(name, details);
      };
      /**
       * Set "has-value" on a field based on it's value
       */
      this.setHasValueClass = (input) => {
        const field = acf.getInstance(this.$field(input));
        if (!field || ![
          "text",
          "password",
          "url",
          "email",
          "number",
          "textarea",
          "select",
          "true_false",
          "date_picker",
          "time_picker",
          "date_time_picker",
          "oembed"
        ].includes(field.data.type)) {
          return;
        }
        const val = field.val();
        const hasValue = Array.isArray(val) ? val.length > 0 : Boolean(val);
        field.$el.toggleClass("has-value", hasValue);
      };
      /**
       * Submit on Change, debounced
       */
      this.maybeSubmitOnChange = debounce(() => {
        if (this.options.ajax.submitOnChange) {
          this.submit();
        }
      }, 100);
      this.$form = $2(el);
      this.options = merge(defaults, options);
      if (this.options.debug) this.logger = createLogger();
      if (!(el instanceof HTMLFormElement)) {
        console.error("Form element doesn't exist");
        return;
      }
      if (typeof acf === "undefined") {
        console.error("The global acf object is not defined");
        return;
      }
      this.initialize();
    }
    customizeForm() {
      if (this.options.ajax.enabled) {
        this.$form.addClass("is-ajax-submit");
      }
      this.$form.find('[data-event="add-row"]').removeClass("acf-icon");
      this.$form.on("click", '[data-event="remove-row"]', function() {
        $2(this).trigger("click");
      });
    }
    /**
     * Get the form data from the form
     *
     * Includes a fix for WebKit with empty file inputs
     * @see @see https://stackoverflow.com/a/49827426/586823
     */
    getFormData() {
      const $emptyFileInputs = this.$form.find('input[type="file"]:not([disabled])').filter((i, input) => !input.disabled && !Boolean(input.files));
      $emptyFileInputs.prop("disabled", true);
      const data = new FormData(this.$form[0]);
      $emptyFileInputs.prop("disabled", false);
      return data;
    }
    handleAjaxResponse(response) {
      acf.hideSpinner();
      this.showAjaxResponse(response);
      if (!response.success) {
        return;
      }
      this.triggerDomEvent("acfff/ajax/success", { response });
      acf.unload.disable();
      setTimeout(() => {
        this.$form.removeClass("show-ajax-response");
        acf.unlockForm(this.$form);
        this.$form.removeClass("acfff-locked");
        if (!this.options.ajax.submitOnChange) {
          this.resetForm();
        }
      }, this.options.ajax.waitAfterSubmit);
    }
    createAjaxResponse() {
      this.$ajaxResponse = $2(
        /*html*/
        `<div class="acf-ajax-response"></div>`
      );
      this.$form.find(".acf-form-submit").append(this.$ajaxResponse);
    }
    showAjaxResponse(response) {
      var _a, _b, _c;
      let message = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.message;
      if (!message) {
        (_b = this.logger) == null ? void 0 : _b.warn("No response message found in AJAX response");
        return;
      }
      this.triggerDomEvent("acfff:response", response);
      (_c = this.$ajaxResponse) == null ? void 0 : _c.text(message).toggleClass("is--error", response.success === false);
      this.$form.addClass("show-ajax-response");
    }
    /**
     * Reset the form back to the defaults
     */
    resetForm() {
      this.$form[0].reset();
      this.$form.find(".acf-field").find("input,textarea,select").trigger("change");
    }
    /**
     * Initially hide fields that should be hidden by conditional logic
     */
    hideConditionalFields() {
      this.$form.find(".acf-field.hidden-by-conditional-logic").hide();
    }
    /**
     * Watch fields for changes and react
     */
    watchFields() {
      const selector = "input,textarea,select";
      this.$form.on("input change", selector, ({ currentTarget, type }) => {
        this.setHasValueClass(currentTarget);
        if (type === "change") this.maybeSubmitOnChange();
      });
      this.$form.find(selector).each((i, el) => {
        this.setHasValueClass(el);
      });
    }
    /**
     * Get the jQuery wrapped field element, based on an input
     */
    $field(input) {
      return $2(input).parents(".acf-field:first");
    }
  };
  FrontendForm.defaults = defaults;

  // assets-src/js/FrontendFormElement.ts
  var initializedElements = /* @__PURE__ */ new Set();
  var FrontendFormElement = class extends HTMLElement {
    /**
     * [initialized] getter and setter
     */
    get initialized() {
      return this.hasAttribute("initialized");
    }
    set initialized(value) {
      this.toggleAttribute("initialized", value);
    }
    connectedCallback() {
      const observer = new MutationObserver((mutations) => {
        if (this.querySelector("form")) {
          this.init();
          observer.disconnect();
        }
      });
      observer.observe(this, { childList: true, subtree: true });
    }
    async init() {
      var _a, _b;
      if (initializedElements.has(this)) return;
      initializedElements.add(this);
      this.initialized = true;
      const form = this.querySelector("form");
      if (!form) {
        return console.error("No form found");
      }
      if (!form.querySelector("input[name=_acf_screen][value=acf_form]")) {
        return console.error("Something seems off with the acf form");
      }
      const options = JSON.parse(
        ((_b = (_a = this.querySelector("script[data-acfff-options")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim()) || "{}"
      );
      new FrontendForm(form, options);
    }
  };
  function register() {
    if (!window.customElements.get("acf-frontend-form")) {
      window.customElements.define("acf-frontend-form", FrontendFormElement);
    }
  }

  // assets-src/acfff.ts
  var import_autosize = __toESM(require_autosize(), 1);
  window.acfff = {
    autofill
  };
  (($3, acf2) => {
    if (typeof acf2 === "undefined") {
      console.error("The global acf object is not defined");
      return;
    }
    register();
    setup();
    async function setup() {
      acf2.addAction("new_field", async (field) => {
        if (field.$el.hasClass("acfff-initialized")) return;
        field.$el.addClass("acfff-initialized");
      });
      acf2.addAction("new_field/type=textarea", (field) => {
        initAutosize(field);
      });
      acf2.showSpinner = function() {
        $3("html").addClass("acfff-loading");
      };
      acf2.hideSpinner = function() {
        $3("html").removeClass("acfff-loading");
      };
      acf2.addAction("remove", ($el) => {
        const $repeater = $el.closest(".acf-repeater");
        $el.remove();
        adjustRepeater($repeater, "remove");
      });
      acf2.addAction("append", ($el) => {
        adjustRepeater($el.closest(".acf-repeater"), "append");
      });
    }
    function initAutosize(field) {
      if (field.get("type") !== "textarea") return;
      field.$input().each((i, el) => {
        (0, import_autosize.default)(el);
      }).on("autosize:resized", function() {
        $3(window).trigger("resize");
      });
    }
    function adjustRepeater($repeater, action) {
      if (!$repeater.length) {
        return;
      }
      const repeater = acf2.get_data($repeater);
      const $rows = $repeater.find(".acf-row:not(.acf-clone)");
      const $lastRow = $rows.last();
      const $addRow = $lastRow.find('[data-event="add-row"]');
      $addRow.toggleClass(
        "acff:disabled",
        repeater.max > 0 && $rows.length >= repeater.max
      );
      if (action === "append") focusFirstInput($lastRow);
      $3(document).trigger("acfff:form-resized");
    }
    async function focusFirstInput($el) {
      var _a;
      await nextTick();
      (_a = $el.find("input,select,textarea")[0]) == null ? void 0 : _a.focus();
    }
  })(jQuery, window.acf);
})();
/*! Bundled license information:

autosize/dist/autosize.js:
  (*!
  	autosize 4.0.4
  	license: MIT
  	http://www.jacklmoore.com/autosize
  *)
*/
//# sourceMappingURL=acfff.js.map
