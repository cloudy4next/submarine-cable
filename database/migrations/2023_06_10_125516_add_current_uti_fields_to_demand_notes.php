<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCurrentUtiFieldsToDemandNotes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('demand_notes', function (Blueprint $table) {
            //
            $table->string('pending_notes')->default(0);
            $table->string('on_process_notes')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('demand_notes', function (Blueprint $table) {
            //
        });
    }
}
