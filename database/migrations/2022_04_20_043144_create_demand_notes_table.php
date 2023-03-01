<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Ramsey\Uuid\Type\Integer;

class CreateDemandNotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('demand_notes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('report_id')->nullable();
            $table->integer('customer_id');
            $table->integer('service_id');
            $table->integer('sub_service_id');
            $table->integer('capacity_id');
            $table->integer('grp_or_zone');
            $table->integer('group_id');
            $table->integer('circuit_id');
            $table->integer('count_demand_note');
            $table->integer('qty')->default(1);
            $table->integer('max');
            $table->integer('port')->default(0);
            $table->integer('portqty')->default(1);
            $table->integer('approval_status')->default(1);
            $table->string('circuit_designation')->nullable();
            $table->string('backhole_port')->nullable();
            $table->double('mrc');
            $table->Integer('country')->nullable();
            $table->Integer('add_sub')->nullable();
            $table->string('remarks')->nullable();
            $table->double('charge');
            $table->Integer('discount')->nullable();
            $table->Integer('specialDiscount')->nullable();
            $table->Integer('deposit');
            $table->Integer('downgrade')->default(0);
            $table->string('reference')->nullable();
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
        Schema::dropIfExists('demand_notes');
    }
}