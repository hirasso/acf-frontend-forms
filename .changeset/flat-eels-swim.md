---
"acf-frontend-forms": major
---

- Disable the jQuery API
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
