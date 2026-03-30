<?php

use App\Http\Controllers\JobPostingController;
use App\Http\Controllers\BidController;
use Illuminate\Support\Facades\Route;

// Public homepage
Route::get('/', function () {
    return inertia('Welcome');
});

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {

    // ── Dashboard ────────────────────────────────────────────────
    Route::get('/dashboard', function () {
        $user = auth()->user();

        if ($user->isClient()) {
            $jobPostings = $user->jobPostings()
                ->withCount('bids')
                ->latest()
                ->get();
            return inertia('Dashboard', ['jobPostings' => $jobPostings]);
        }

        $bids = $user->bids()
            ->with('jobPosting')
            ->latest()
            ->get();
        return inertia('Dashboard', ['bids' => $bids]);

    })->name('dashboard');

    // ── Job Postings (CRUD) ──────────────────────────────────────
    Route::resource('job-postings', JobPostingController::class);

    // ── Bids ────────────────────────────────────────────────────
    Route::post('job-postings/{job_posting}/bids', [BidController::class, 'store'])
        ->name('bids.store');

    Route::patch('bids/{bid}/accept', [BidController::class, 'accept'])
        ->name('bids.accept');

    Route::patch('bids/{bid}/reject', [BidController::class, 'reject'])
        ->name('bids.reject');

});

// Breeze auth routes
require __DIR__.'/auth.php';