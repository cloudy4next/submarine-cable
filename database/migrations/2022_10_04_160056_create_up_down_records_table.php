<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUpDownRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('up_down_records', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('customer_id');
            $table->integer('demandnote_id');
            $table->integer('group_id');
            $table->integer('service_id');
            $table->integer('sub_service_id');
            $table->integer('max')->default(0);
            $table->integer('downgrade')->default(0);
            $table->integer('up_down');
            $table->date('approved_date')->nullable();
            $table->date('downgrade_date')->nullable();
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
        Schema::dropIfExists('up_down_records');
    }
}