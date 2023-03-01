<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateColocationBillAdjustmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('colocation_bill_adjustments', function (Blueprint $table) {
             $table->bigIncrements('id');
             $table->integer('invoice_id');
             $table->string('billing_month');
             $table->string('bill_adjust_month');
             $table->string('adjust_month_name');
             $table->integer('customer_id');
             $table->integer('circuit_id');
             $table->integer('group_id');
             $table->integer('tot_circuit');
             $table->integer('this_group_circuit');
             $table->integer('rate');
             $table->integer('urate')->nullable()->default(0);
             $table->integer('discount');
             $table->integer('rate_after_discount');
             $table->integer('amount');
             $table->integer('add_sub');
             $table->integer('dif_days');
             $table->integer('tot_days');
             $table->string('sdate');
             $table->string('edate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('colocation_bill_adjustments');
    }
}