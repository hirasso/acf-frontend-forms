<?php

namespace Hirasso\ACFFF\Form;

/**
 * Render an ACF Frontend Form
 * - The form will be wrapped in a custom element `<acf-frontend-form></acf-frontend-form>`
 */
final class Form
{
    protected readonly JSOptions $jsOptions;
    protected bool $wrap = true;
    protected bool $maxlength = true;

    /** @param array<string, mixed> $args */
    public function __construct(
        public readonly array $args,
    ) {
        $this->jsOptions = new JSOptions();
    }

    /**
     * Set AJAX options for this form
     *
     * - true to enable
     * - fase to disable
     * - an object for full control
     */
    public function ajax(bool|AjaxOptions|null $value = true): self
    {
        $this->jsOptions->ajax = \is_bool($value)
            ? new AjaxOptions(enabled: $value)
            : $value;

        return $this;
    }

    /**
     * Do not wrap the form in our custom element. If you do this,
     * you need to wrap it yourself using <acf-frontend-form></acf-frontend-form>
     */
    public function unwrap(): self
    {
        $this->wrap = false;
        return $this;
    }

    public function maxlength(): self
    {
        $this->maxlength = true;
        return $this;
    }

    /**
     * Render the form
     */
    public function render(): ?string
    {
        /** Buffer the acf_form() */
        \ob_start();
        $this->add_hooks();
        \acf_form($this->args);
        $this->remove_hooks();
        $vanilla_acf_form = \trim(\ob_get_clean() ?: '');

        /** return null if acf_form didn't return anything */
        if (empty($vanilla_acf_form)) {
            return null;
        }

        /** Convert the options to JSON */
        $jsOptionsJson = \json_encode($this->jsOptions, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);

        /** Construct the final body */
        $body = \implode("\n", [
            "<script data-acfff-options type='application/json'>$jsOptionsJson</script>",
            $vanilla_acf_form
        ]);

        return $this->wrap
            ? "<acf-frontend-form>$body</acf-frontend-form>"
            : $body;
    }

    protected function add_hooks(): void
    {
        \add_filter('acf/prepare_field/type=image', [$this, 'prepare_image_field']);
        \add_filter('acf/render_field/type=text', [$this, 'render_max_length_info']);
        \add_filter('acf/render_field/type=textarea', [$this, 'render_max_length_info']);
    }

    protected function remove_hooks(): void
    {
        \remove_filter('acf/prepare_field/type=image', [$this, 'prepare_image_field']);
        \remove_filter('acf/render_field/type=text', [$this, 'render_max_length_info']);
        \remove_filter('acf/render_field/type=textarea', [$this, 'render_max_length_info']);
    }

    /**
     * Prepares image fields in frontend forms
     *
     * @param  ?array<string, mixed> $field
     * @return ?array<string, mixed> $field
     */
    public function prepare_image_field(?array $field): ?array
    {
        if (empty($field)) {
            return null;
        }
        $field['preview_size'] = 'large';
        return $field;
    }

    /**
     * Prepare text fields for max chars info
     * @param array<string, mixed> $field
     */
    public function render_max_length_info(array $field): void
    {
        if (!$this->maxlength) {
            return;
        }

        if (!$maxlength = \intval($field['maxlength'] ?? 0)) {
            return;
        }

        \ob_start(); ?>
        <acfff-maxlength-info value="<?= $maxlength ?>">

            <?php
                /* translators: 1: The amount of characters remaining if a field has a max length */
                \sprintf(
                    \__('%s remaining', 'acfff'),
                    \sprintf(
                        "<acfff-maxlength-remaining inline>%s</acfff-maxlength-remaining>",
                        \esc_html((string) $maxlength)
                    )
                );
        ?>
        </acfff-maxlength-info>

        <?php echo \ob_get_clean();
    }

}
