<?php

/**
 * Plugin Name: e2e tests bootstrap plugin
 * Description: Prepares the @wordpress/env tests environment for e2e tests
 */

namespace Hirasso\ACFFF\Tests\e2e;

/** Exit if accessed directly */
if (!\defined('ABSPATH')) {
    exit;
}

/**
 * Check what env we are currently in
 * @return null|"development"|"tests"
 */
function getCurrentEnv(): ?string
{
    $env = (\defined('ACFFF_WP_ENV'))
        ? ACFFF_WP_ENV
        : null;

    return \in_array($env, ['development', 'tests'], true)
        ? $env
        : null;
}

\add_action('plugins_loaded', function () {
    $env = getCurrentEnv();
    if ($env === 'tests') {
        \dump('@TODO: Implement e2e setup');
    }

});
