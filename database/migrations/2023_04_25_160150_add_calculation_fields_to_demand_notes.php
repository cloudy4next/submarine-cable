<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCalculationFieldsToDemandNotes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('demand_notes', function (Blueprint $table) {
            $table->string('reg_charge')->nullable();
            $table->string('ins_charge')->nullable();
            $table->string('mrc_ws')->nullable();
            $table->string('mrc_ws_ad')->nullable();
            $table->string('total_mrc')->nullable();
            $table->string('vat')->nullable();
            $table->string('vat_mrc')->nullable();
            $table->string('sub_total')->nullable();
            $table->string('seq_deposit')->nullable();
            $table->string('total_pay_amount')->nullable();
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
