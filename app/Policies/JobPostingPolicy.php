<?php

namespace App\Policies;

use App\Models\JobPosting;
use App\Models\User;

class JobPostingPolicy
{
    /**
     * Only clients can create job postings.
     */
    public function create(User $user): bool
    {
        return $user->isClient();
    }

    /**
     * Only the client who owns this posting can update it.
     * FIX: authorize('update') was throwing AuthorizationException
     * because no policy existed for JobPosting.
     */
    public function update(User $user, JobPosting $jobPosting): bool
    {
        return $user->isClient() && $user->id === $jobPosting->client_id;
    }

    /**
     * Only the client who owns this posting can delete it.
     * FIX: authorize('delete') was throwing AuthorizationException
     * because no policy existed for JobPosting.
     */
    public function delete(User $user, JobPosting $jobPosting): bool
    {
        return $user->isClient()
            && $user->id === $jobPosting->client_id
            && $jobPosting->status === 'open'; // Cannot delete in-progress jobs
    }
}