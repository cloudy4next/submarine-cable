<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateColocationDemandNotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('colocation_demand_notes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('customer_id');
            $table->integer('service_id');
            $table->integer('sub_service_id');
            $table->integer('capacity_id');
            $table->integer('circuit_id');
            $table->integer('grp_or_zone');
            $table->integer('group_id')->nullable();
            $table->integer('count_demand_note');
            $table->integer('qty')->default(1);
            $table->integer('max');
            $table->integer('rack');
            $table->integer('rackQty')->default(1);
            $table->integer('Power');
            $table->integer('PowerQty')->default(1);
            $table->integer('approval_status')->default(1);
            $table->string('circuit_designation')->nullable();
            $table->string('remarks')->nullable();
            $table->string('backhole_port')->nullable();
            $table->double('mrc');
            $table->double('mrc2');
            $table->double('charge');
            $table->Integer('add_sub')->nullable();
            $table->Integer('discount')->nullable();
            $table->Integer('specialDiscount')->nullable();
            $table->Integer('deposit');
            $table->date('approved_date')->nullable();
            $table->tinyInteger('status')->default('1');
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
        Schema::dropIfExists('colocation_demand_notes');
    }
}