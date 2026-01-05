<?php

namespace Hirasso\ACFFF\Form;

final class JSOptions
{
    public function __construct(
        public ?bool $debug = false,
        public ?AjaxOptions $ajax = new AjaxOptions(),
    ) {
    }
}
