<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\JobPosting;
use App\Http\Requests\StoreBidRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BidController extends Controller
{
    /**
     * Store a new bid on a job posting.
     * FIX: Was completely empty — 500 on every call.
     *
     * Only freelancers can bid (enforced in StoreBidRequest::authorize()).
     * Freelancer cannot bid on their own... well, they can't post jobs anyway.
     * Freelancer cannot bid twice (enforced in StoreBidRequest::rules()).
     * Job must be 'open' to accept new bids.
     */
    public function store(StoreBidRequest $request, JobPosting $jobPosting): RedirectResponse
    {
        // Guard: only accept bids on open job postings
        if ($jobPosting->status !== 'open') {
            return back()->withErrors([
                'job' => 'This job is no longer accepting bids.',
            ]);
        }

        // Create the bid — freelancer_id injected from auth, never from user input
        $jobPosting->bids()->create([
            'freelancer_id' => auth()->id(),
            'amount'        => $request->validated()['amount'],
            'proposal'      => $request->validated()['proposal'],
            'status'        => 'pending',
        ]);

        return redirect()
            ->route('job-postings.show', $jobPosting)
            ->with('success', 'Your bid has been submitted successfully.');
    }

    /**
     * Accept a bid — client only, must own the job posting.
     * FIX: Was empty — 500 on every call.
     *
     * Accepting a bid also:
     * - Rejects all other pending bids on the same job (atomic)
     * - Moves the job posting status to 'in_progress'
     */
    public function accept(Request $request, Bid $bid): RedirectResponse
    {
        $jobPosting = $bid->jobPosting;

        // Authorization: only the client who owns the job can accept bids
        if (auth()->id() !== $jobPosting->client_id) {
            abort(403, 'You are not authorized to accept bids on this job.');
        }

        // Guard: can only accept pending bids on open jobs
        if (! $bid->isPending() || $jobPosting->status !== 'open') {
            return back()->withErrors([
                'bid' => 'This bid cannot be accepted at this time.',
            ]);
        }

        // Accept this bid
        $bid->update(['status' => 'accepted']);

        // Reject all other pending bids on the same job atomically
        $jobPosting->bids()
            ->where('id', '!=', $bid->id)
            ->where('status', 'pending')
            ->update(['status' => 'rejected']);

        // Move job to in_progress
        $jobPosting->update(['status' => 'in_progress']);

        return redirect()
            ->route('job-postings.show', $jobPosting)
            ->with('success', 'Bid accepted. The job is now in progress.');
    }

    /**
     * Reject a specific bid — client only, must own the job posting.
     * FIX: Was empty — 500 on every call.
     */
    public function reject(Request $request, Bid $bid): RedirectResponse
    {
        $jobPosting = $bid->jobPosting;

        // Authorization: only the client who owns the job can reject bids
        if (auth()->id() !== $jobPosting->client_id) {
            abort(403, 'You are not authorized to reject bids on this job.');
        }

        // Guard: can only reject pending bids
        if (! $bid->isPending()) {
            return back()->withErrors([
                'bid' => 'Only pending bids can be rejected.',
            ]);
        }

        $bid->update(['status' => 'rejected']);

        return redirect()
            ->route('job-postings.show', $jobPosting)
            ->with('success', 'Bid rejected.');
    }
};