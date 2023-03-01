<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('service_id');
            $table->integer('mrc')->nullable();
            $table->integer('mrc_after_discount')->nullable();
            $table->integer('discount')->nullable();
            $table->integer('demand_note_id');
            $table->integer('circuit_id');
            $table->integer('customer_id');
            $table->integer('group_id')->nullable();
            $table->integer('grp_or_zone')->nullable();
            $table->string('remarks')->nullable();
            $table->date('inv_date');
            $table->tinyInteger('istally_active')->default('0');
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
        Schema::dropIfExists('invoices');
    }
}
