<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIplcBillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('iplc_bills', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('service_id');
            $table->integer('sub_service_id');
            $table->integer('cus_type_id');
            $table->integer('grp_zone_id');
            $table->date('billing_month');
            $table->date('bill_process_date');
            $table->integer('total_custonmer')->nullable();
            $table->integer('total_mrc')->nullable();
            $table->integer('total_mbc')->nullable();
            $table->integer('total_vat')->nullable();
            $table->integer('total_adjust')->nullable();
            $table->integer('total_mrc_after_discount')->nullable();
            $table->integer('net_total')->nullable();
            $table->integer('bill_creator')->nullable();
            $table->tinyInteger('invoice_status')->default('0');
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
        Schema::dropIfExists('iplc_bills');
    }
}
