# Changelog: hirasso/acf-frontend-forms

## 1.0.0

### Major Changes

- 6dca673: - Disable the jQuery API
  - Introduce new php API function `acf_frontend_form()`:

  ```php
  /**
   * Render an ACF Frontend Form
   * @param array<string, mixed> $args – These options are forwarded unmodified to acf_form($args)
   * @see https://www.advancedcustomfields.com/resources/acf_form/
   */
  echo acfff()->form([
    /** @see https://www.advancedcustomfields.com/resources/acf_form/ */
  ])->ajax(
    waitAfterSubmit: 1500,
    resetAfterSubmit: true,
    submitOnChange: false,
  )->render();
  ```

- 6dca673: **BREAKING** Rename everyhing from `acff()` to `acfff()` 🤡

### Patch Changes

- 6dca673: Always activate the ACF validation, even on pages without any ACF form. This fixes a bug where ACF form validation would not be activated when first visiting a page **without a form** and then navigating to a page via AJAX (SPA) that **does contain a form**.
