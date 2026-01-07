<?php

/**
 * Plugin Name: ACF Frontend Forms
 * Version: 1.0.0
 * Author: Rasso Hilber
 * Description: Enhancments for Advanced Custom Fields's acf_form() 📚
 * Author URI: https://rassohilber.com
 * License: GPL-3.0-or-later
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 * GitHub Plugin URI: https://github.com/hirasso/acf-frontend-forms
**/

use Hirasso\ACFFF\ACFFF;

/** Exit if accessed directly */
if (! \defined('ABSPATH')) {
    exit;
}

/**
 * Require the autoloader
 * - vendor/autoload.php in development (composer)
 * - autoload.dist.php in production (not composer)
 */
require_once match(\is_readable(__DIR__ . '/vendor/autoload.php')) {
    true => __DIR__ . '/vendor/autoload.php',
    default => __DIR__ . '/autoload.dist.php'
};


\define('ACFFF_ROOT', __FILE__);

/**
 * API Access to ACFFF Singleton Instance
 */
function acfff(): ACFFF
{
    /** @var ?ACFFF $instance */
    static $instance = null;

    if (!$instance) {
        $instance = new ACFFF();
    }

    return $instance;
}

\add_action('plugins_loaded', 'acfff');
