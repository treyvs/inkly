<?php

namespace App\Http\Controllers;

use App\Models\JobPosting;
use App\Http\Requests\StoreJobPostingRequest;
use App\Http\Requests\UpdateJobPostingRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobPostingController extends Controller
{
    /**
     * PUBLIC: All users see the job board
     * Freelancers browse open jobs here
     */
   public function index()
{
    $jobPostings = JobPosting::with('client')
        ->withCount('bids')
        ->open()
        ->latest()
        ->paginate(9);

    return Inertia::render('JobPostings/Index', [
        'jobPostings' => $jobPostings,
    ]);
}

    /**
     * CLIENT ONLY: Show form to create a new job posting
     */
    public function create()
    {
        return Inertia::render('JobPostings/Create');
    }

    /**
     * CLIENT ONLY: Save new job posting to database
     */
    public function store(StoreJobPostingRequest $request)
    {
        $request->user()->jobPostings()->create($request->validated() + [
            'status' => 'open',
        ]);

        return redirect()->route('job-postings.index')
            ->with('success', 'Job posting created successfully.');
    }

    /**
     * PUBLIC: Show a single job posting with its bids
     */
    public function show(JobPosting $jobPosting)
    {
        $jobPosting->load(['client', 'bids.freelancer']);

        return Inertia::render('JobPostings/Show', [
            'jobPosting' => $jobPosting,
        ]);
    }

    /**
     * CLIENT ONLY: Show form to edit an existing posting
     */
    public function edit(JobPosting $jobPosting)
    {
        $this->authorize('update', $jobPosting);

        return Inertia::render('JobPostings/Edit', [
            'jobPosting' => $jobPosting,
        ]);
    }

    /**
     * CLIENT ONLY: Save updates to an existing posting
     */
    public function update(UpdateJobPostingRequest $request, JobPosting $jobPosting)
    {
        $jobPosting->update($request->validated());

        return redirect()->route('job-postings.index')
            ->with('success', 'Job posting updated successfully.');
    }

    /**
     * CLIENT ONLY: Delete a job posting and its bids
     */
    public function destroy(JobPosting $jobPosting)
    {
        $this->authorize('delete', $jobPosting);

        $jobPosting->delete();

        return redirect()->route('job-postings.index')
            ->with('success', 'Job posting deleted.');
    }
}