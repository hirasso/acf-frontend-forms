<?php

/**
 * Plugin Name: e2e tests bootstrap plugin
 * Description: Prepares the @wordpress/env tests environment for e2e tests
 * Version: 10000.0.0
 */

namespace Hirasso\ACFFF\Tests\E2E;

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

if (getCurrentEnv() === 'tests') {
    \add_action('after_setup_theme', fn () => new Setup());
};
