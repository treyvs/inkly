<?php

namespace App\Providers;

use App\Models\JobPosting;
use App\Policies\JobPostingPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // FIX: Register the JobPostingPolicy so authorize() calls
        // in JobPostingController don't throw AuthorizationException.
        Gate::policy(JobPosting::class, JobPostingPolicy::class);
    }
}