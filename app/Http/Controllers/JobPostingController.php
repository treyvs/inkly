<?php

namespace App\Http\Controllers;

use App\Models\JobPosting;
use App\Http\Requests\StoreJobPostingRequest;
use App\Http\Requests\UpdateJobPostingRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobPostingController extends Controller
{
    /**
     * PUBLIC: All authenticated users see the job board.
     * Freelancers browse open jobs here. Clients see all jobs.
     */
    public function index(): Response
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
     * CLIENT ONLY: Show form to create a new job posting.
     */
    public function create(): Response
    {
        // FIX: Policy replaces manual role checks inline
        $this->authorize('create', JobPosting::class);

        return Inertia::render('JobPostings/Create');
    }

    /**
     * CLIENT ONLY: Save new job posting to database.
     * FIX: $request->validated() now returns actual data because
     * StoreJobPostingRequest::rules() is properly defined.
     * Previously returned [] so only 'status' => 'open' was ever saved.
     */
    public function store(StoreJobPostingRequest $request): RedirectResponse
    {
        // StoreJobPostingRequest::authorize() already gates this to clients only.
        // validated() now returns title, description, budget correctly.
        $request->user()->jobPostings()->create(
            $request->validated() + ['status' => 'open']
        );

        return redirect()
            ->route('job-postings.index')
            ->with('success', 'Job posting created successfully.');
    }

    /**
     * PUBLIC (authenticated): Show a single job posting with its bids.
     * Bid visibility is role-gated in the React component.
     */
    public function show(JobPosting $jobPosting): Response
    {
        $jobPosting->load(['client', 'bids.freelancer']);

        // Pass the auth user's existing bid (if any) so the UI can show state
        $userBid = null;
        if (auth()->user()->isFreelancer()) {
            $userBid = $jobPosting->bids
                ->firstWhere('freelancer_id', auth()->id());
        }

        return Inertia::render('JobPostings/Show', [
            'jobPosting' => $jobPosting,
            'userBid'    => $userBid,
            'isOwner'    => auth()->id() === $jobPosting->client_id,
        ]);
    }

    /**
     * CLIENT ONLY: Show form to edit an existing posting.
     */
    public function edit(JobPosting $jobPosting): Response
    {
        // FIX: Policy now exists — this no longer throws AuthorizationException
        $this->authorize('update', $jobPosting);

        return Inertia::render('JobPostings/Edit', [
            'jobPosting' => $jobPosting,
        ]);
    }

    /**
     * CLIENT ONLY: Save updates to an existing posting.
     */
    public function update(UpdateJobPostingRequest $request, JobPosting $jobPosting): RedirectResponse
    {
        // UpdateJobPostingRequest::authorize() already gates to owner only
        $jobPosting->update($request->validated());

        return redirect()
            ->route('job-postings.show', $jobPosting)
            ->with('success', 'Job posting updated successfully.');
    }

    /**
     * CLIENT ONLY: Delete a job posting and its bids.
     */
    public function destroy(JobPosting $jobPosting): RedirectResponse
    {
        // FIX: Policy now exists — this no longer throws AuthorizationException
        $this->authorize('delete', $jobPosting);

        $jobPosting->delete();

        return redirect()
            ->route('job-postings.index')
            ->with('success', 'Job posting deleted.');
    }
}