/**
 * TypeScript declarations for Advanced Custom Fields JavaScript API
 */

import { autofill } from "./js/autofill.js";

/**
 * ACF Field object
 */
export interface ACFField {
  /** The field's jQuery element */
  $el: JQuery;

  /** Get the field's input element(s) */
  $input(): JQuery;

  /** Field type */
  type: string;

  /** Field key */
  key: string;

  /** Field name */
  name: string;

  /** Get field value */
  val(): any;

  /** Set field value */
  val(value: any): void;

  /** Show error message */
  showError(message: string): void;

  /** Remove error message */
  removeError(): void;

  /** Field data */
  data: {
    type: string;
    required: number;
    key: string;
    name: string;
  };

  /** Get something from this field's data */
  get(key: string): any;
}

/**
 * Data returned from acf.get_data() for repeater fields
 */
export interface ACFRepeaterData {
  /** Maximum number of rows allowed */
  max: number;

  /** Minimum number of rows required */
  min: number;

  [key: string]: any;
}

/** Arguments for acf.findFields */
export interface ACFFindFieldsArgs {
  key?: string;
  name?: string;
  type?: string;
  is?: string;
  parent?: JQuery;
  sibling?: JQuery;
  limit?: number | false;
  visible?: boolean;
  suppressFilters?: boolean;
  excludeSubFields?: boolean;
}

/** the type of acf.data */
export type ACFGlobalConfig = {
  validation?: boolean;

  select2L10n: Record<string, any>;

  google_map_api: string;

  datePickerL10n: {
    closeText: string;
    currentText: string;
    nextText: string;
    prevText: string;
    weekHeader: string;
    monthNames: string[];
    monthNamesShort: string[];
    dayNames: string[];
    dayNamesMin: string[];
    dayNamesShort: string[];
    isRTL: boolean | null;
    [key: string]: any;
  };

  dateTimePickerL10n: {
    timeOnlyTitle: string;
    timeText: string;
    hourText: string;
    minuteText: string;
    secondText: string;
    millisecText: string;
    microsecText: string;
    timezoneText: string;
    currentText: string;
    closeText: string;
    selectText: string;
    amNames: string[];
    pmNames: string[];
    isRTL: boolean | null;
    [key: string]: any;
  };

  colorPickerL10n: Record<string, any>;

  iconPickerA11yStrings: Record<string, any>;

  iconPickeri10n: Record<string, string>;

  mimeTypeIcon: string;

  mimeTypes: Record<string, string>;

  admin_url: string;
  ajaxurl: string;
  nonce: string;

  acf_version: string;
  wp_version: string;

  browser: string;
  locale: string;
  rtl: boolean;

  screen?: string;
  post_id?: number | string | null;

  editor: "classic" | "block" | string;

  is_pro: boolean;
  debug: boolean;
  StrictMode: boolean;
};

type ACFActionCallbackReturn = void | Promise<void>;

type ACFKey = keyof ACFGlobalConfig;

/**
 * Advanced Custom Fields global API
 */
export type ACF = {
  data: ACFGlobalConfig;

  /** Get a property from acf.data */
  get<K extends ACFKey>(key: K): ACFGlobalConfig[K];

  /** Set a property in acf.data */
  set<K extends ACFKey>(key: K, value?: ACFGlobalConfig[K]): ACFGlobalConfig;

  /**
   * Add an action hook
   * @param action - Action name (e.g., 'new_field', 'new_field/type=image', 'submit', 'append', 'remove')
   * @param callback - Callback function (receives ACFField for field actions, JQuery for element actions)
   */
  addAction<T extends HTMLElement>(
    action: "remove" | "append",
    callback: (arg: JQuery<T>) => ACFActionCallbackReturn,
  ): void;
  addAction(
    action: `validation_${"beginn" | "failure" | "success" | "complete"}`,
    callback: (
      $form: JQuery<HTMLFormElement>,
      valdation: Record<any, any>,
    ) => ACFActionCallbackReturn,
  ): void;
  addAction(
    action: "submit",
    callback: ($form: JQuery<HTMLFormElement>) => ACFActionCallbackReturn,
  ): void;
  addAction(
    action: `new_field/type=${"image" | "file"}`,
    callback: (arg: ACFAttachmentField) => ACFActionCallbackReturn,
  ): void;
  addAction(
    action: "new_field" | `new_field/type=${string}`,
    callback: (arg: ACFField) => ACFActionCallbackReturn,
  ): void;

  /**
   * Get an ACFfield based on field key
   */
  getField(key: string | JQuery): ACFField | undefined;

  /**
   * Get an ACFfield based on $field element
   */
  getInstance($field: JQuery): ACFField | undefined;

  /**
   * Trigger an action hook
   */
  doAction(action: string, ...args: any[]): void;

  /**
   * Get data from an ACF element
   * @param $el - jQuery element
   */
  get_data<T = unknown>($el: JQuery): T;

  /**
   * Show loading spinner
   */
  showSpinner(): void;

  /**
   * Hide loading spinner
   */
  hideSpinner(): void;

  /**
   * Lock a form. Show spinners.
   */
  lockForm($form: JQuery): void;

  /**
   * Unlock a form. Hide spinners.
   */
  unlockForm($form: JQuery): void;

  /**
   * Validation API
   */
  validation: {
    enable(): void;
    reset($form: JQuery<HTMLFormElement>): void;
    disable(): void;
  };

  /**
   * Validate a form
   *
   * @param form – A jQuery instance of the HTMLFormElement
   * @param event – Will be re-triggered if validation passes. Do not use
   * @param reset – If errors, notices etc. should be reset after validation
   */
  validateForm(args: {
    form: JQuery<HTMLFormElement>;
    event?: SubmitEvent | JQuery.Event<SubmitEvent>;
    reset?: boolean;
    loading?: () => void;
    complete?: () => void;
    failure?: () => void;
    success?: ($form: JQuery<HTMLFormElement>) => void;
  }): void;

  /**
   * An ACF validator Backbone.js Model instance
   */
  validator: {
    id: "Validator";
  };

  /**
   * Unload API
   */
  unload: {
    enable(): void;
    disable(): void;
  };

  /**
   * Find ACF field DOM elements matching the given criteria.
   *
   * This function performs a DOM-level query and always returns a jQuery
   * collection of `.acf-field` elements. It does not return field instances.
   *
   * Filters applied internally by ACF:
   * - `find_fields_args`
   * - `find_fields_selector`
   * - `find_fields`
   *
   * @param args Query arguments used to build the field selector.
   */
  findFields(args?: ACFFindFieldsArgs): JQuery<HTMLElement>;

  /**
   * Resolve ACF field instances from either a jQuery collection of field
   * elements or from a `findFields` argument object.
   *
   * This function always returns a plain array of ACF field objects.
   *
   * @param args Either a jQuery collection of `.acf-field` elements
   *             or a `findFields` argument object.
   */
  getFields(args?: JQuery | ACFFindFieldsArgs): ACFField[];
};

/**
 * Image field data settings
 */
export interface ImageFieldSettings {
  restrictions?: {
    max_size?: {
      value: number;
      error: string;
    };
    mime_types?: {
      value: string[];
      error: string;
    };
  };
}

/**
 * ACF Attachment Field - extends ACFField with file/image-specific methods
 */
export interface ACFAttachmentField extends ACFField {
  /** Remove attachment from field */
  removeAttachment(): void;
}

declare global {
  interface Window {
    acf: ACF;
    jQuery: JQueryStatic;
    acfAutofillValues?: Record<string, any>[];
    acfff: {
      autofill: typeof autofill;
    };
  }
}
