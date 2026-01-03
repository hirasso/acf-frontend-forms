<?php

namespace Hirasso\ACFFF\Tests\Pest;

/**
 * wp-phpunit bootstrap file
 *
 * @see https://github.com/wp-phpunit/example-plugin/blob/master/tests/bootstrap.php
 */

// Load wp-env's config file in the container, but still use our own wp-phpunit
\putenv('WP_PHPUNIT__TESTS_CONFIG=/wordpress-phpunit/wp-tests-config.php');

// Composer autoloader must be loaded before WP_PHPUNIT__DIR will be available
require_once \dirname(\dirname(__DIR__)) . '/vendor/autoload.php';

// Give access to tests_add_filter() function.
require_once \getenv('WP_PHPUNIT__DIR') . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
\tests_add_filter('muplugins_loaded', function () {
    // require ACF, which is a dependency of ACFML
    require_once(\dirname(\dirname(__DIR__)) . '/advanced-custom-fields/acf.php');
    // require the main plugin file
    require_once(\dirname(__DIR__) . '/acf-frontend-forms.php');
    // don't autamatically load acfml in tests
    \remove_action('plugins_loaded', 'acfff');
});

// Start up the WP testing environment.
require_once \getenv('WP_PHPUNIT__DIR') . '/includes/bootstrap.php';
