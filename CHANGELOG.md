# Changelog: hirasso/acf-frontend-forms

## 1.0.0

### Major Changes

- 6dca673: - Disable the jQuery API
  - Introduce new fluent API for rendering forms:

  ```php
  /**
   * Render an ACF Frontend Form
   * @param array<string, mixed> $args – These options are forwarded unmodified to acf_form($args)
   * @see https://www.advancedcustomfields.com/resources/acf_form/
   */
  echo acfff()->form([
    'field_groups' => ['group_1234r51245'],
  ])
  /** Submit the form via ajax */
  ->ajax(
    enabled: true,
    waitAfterSubmit: 1500,
    resetAfterSubmit: true,
    submitOnChange: false,
  )
  /** Activate debug logging to the console */
  ->debug();
  ```

- 6dca673: Rename everyhing from `acff()` to `acfff()` (== **ACF** **F**rontend **F**orms)

### Patch Changes

- 6dca673: Always activate the ACF validation, even on pages without any ACF form. This fixes a bug where ACF form validation would not be activated when first visiting a page **without a form** and then navigating to a page via AJAX (SPA) that **does contain a form**.
