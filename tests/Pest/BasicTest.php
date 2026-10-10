<?php

namespace Hirasso\ACFFF\Tests\Pest;

use Hirasso\ACFFF\ACFFF;

class BasicTest extends TestCase
{
    private ACFFF $instance;

    public function setUp(): void
    {
        parent::setUp();
        $this->instance = new ACFFF();
    }

    public function test_has_correct_prefix(): void
    {
        $this->assertSame($this->instance->get_prefix(), 'acfff');
    }
}
