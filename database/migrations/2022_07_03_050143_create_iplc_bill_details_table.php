<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIplcBillDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('iplc_bill_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('bill_id');
            $table->integer('service_id');
            $table->integer('sub_service_id')->nullable();
            $table->integer('customer_id');
            $table->string('circuit_id')->nullable();
            $table->text('demand_approved_date');
            $table->date('billing_month');
            $table->date('bill_process_date');
            $table->integer('mrc')->nullable();
            $table->integer('old_mrc')->nullable();
            $table->integer('mbc')->nullable();
            $table->integer('vat')->nullable();
            $table->integer('adjust')->nullable();
            $table->integer('add_sub')->default(1);
            $table->integer('old_mrc_after_discount')->nullable();
            $table->integer('net_total')->nullable();
            $table->integer('bill_creator')->nullable();
            $table->text('remarks')->nullable();
            $table->string('approved_date')->nullable();;
            $table->tinyInteger('invoice_status')->default('0');
            $table->tinyInteger('invoice_ganarete')->default('0');
            $table->tinyInteger('bill_status')->default('0');
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
        Schema::dropIfExists('iplc_bill_details');
    }
}