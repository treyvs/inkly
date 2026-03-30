<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bids', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')
                  ->constrained('jobs')
                  ->onDelete('cascade');
            $table->foreignId('freelancer_id')
                  ->constrained('users')
                  ->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->text('proposal');
            $table->enum('status', ['pending', 'accepted', 'rejected'])
                  ->default('pending');
            $table->timestamps();

            // A freelancer can only bid once per job
            $table->unique(['job_id', 'freelancer_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bids');
    }
};