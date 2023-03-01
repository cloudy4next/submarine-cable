<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('com_name');
            $table->string('name');
            $table->foreignId('customer_type_id')->constrained('customer_types');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('bin_vat_etc');
            $table->string('tin')->nullable();
            // $table->tinyInteger('role')->default(1)->comment('1=User, 2=Super Admin, 3=Admin');
            $table->string('address')->nullable();
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
        Schema::dropIfExists('customers');
    }
}