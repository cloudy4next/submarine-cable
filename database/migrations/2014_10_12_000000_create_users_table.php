<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('password');
            $table->integer('role_id');
            $table->tinyInteger('sign_iplc_demandnote')->default(0);
            $table->tinyInteger('sign_ipt_demandnote')->default(0);
            $table->tinyInteger('sign_iplc_invoice')->default(0);
            $table->tinyInteger('sign_ipt_invoice')->default(0);
            $table->tinyInteger('sign_iplc_report')->default(0);
            $table->tinyInteger('sign_ipt_report')->default(0);
            $table->tinyInteger('type')->nullable()->comment('1=IPLC, 2=IP Transit, 3=Colocation Service');
            $table->string('address')->nullable();
            $table->string('designation',20)->nullable();
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
        Schema::dropIfExists('users');
    }
}