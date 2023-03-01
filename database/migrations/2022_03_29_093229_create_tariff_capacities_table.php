<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTariffCapacitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tariff_capacities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sub_service_id')->constrained('sub_services');
            $table->foreignId('circuit_id')->constrained('circuit_categories');
            $table->string('capacity_name',100);
            $table->float('instl_charge',10);
            $table->integer('max');
            $table->string('status')->default(1);
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
        Schema::dropIfExists('tariff_capacities');
    }
}
