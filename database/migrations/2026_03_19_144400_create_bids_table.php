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

            // FIX: was foreignId('job_id')->constrained('jobs')
            // which pointed to Laravel's internal queue jobs table.
            // Now correctly references the job_postings table.
            $table->foreignId('job_posting_id')
                  ->constrained('job_postings')
                  ->onDelete('cascade');

            $table->foreignId('freelancer_id')
                  ->constrained('users')
                  ->onDelete('cascade');

            $table->decimal('amount', 10, 2);
            $table->text('proposal');

            $table->enum('status', ['pending', 'accepted', 'rejected'])
                  ->default('pending');

            $table->timestamps();

            // A freelancer can only bid once per job posting
            $table->unique(['job_posting_id', 'freelancer_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bids');
    }
};