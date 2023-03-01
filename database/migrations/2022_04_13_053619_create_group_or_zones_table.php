<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupOrZonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_or_zones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sub_service_id')->constrained('sub_services');
            $table->foreignId('capacity_id',100)->constrained('tariff_capacities');
            $table->foreignId('circuit_id',100)->constrained('circuit_categories');
            $table->string('grp_or_zone');
            $table->decimal('charge',15,2);
            $table->decimal('vat',15,2)->default(0);
            $table->tinyInteger('status')->default(1);
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
        Schema::dropIfExists('group_or_zones');
    }
}
