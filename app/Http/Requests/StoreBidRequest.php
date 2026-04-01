<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBidRequest extends FormRequest
{
    /**
     * Only freelancers are authorized to place bids.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isFreelancer();
    }

    public function rules(): array
    {
        // FIX: job_posting_id now matches corrected migration column name.
        // The unique check uses job_posting_id (not job_id) from the route model.
        $jobPostingId = $this->route('job_posting')->id;

        return [
            'amount'   => ['required', 'numeric', 'min:1', 'max:999999.99'],
            'proposal' => ['required', 'string', 'min:20', 'max:5000'],

            // Prevent duplicate bids: same freelancer on same job posting.
            // FIX: Using job_posting_id to match corrected migration.
            // The freelancer_id comes from auth(), not user input — prevents spoofing.
            'no_duplicate' => [
                Rule::unique('bids', 'freelancer_id')->where(
                    fn ($query) => $query
                        ->where('job_posting_id', $jobPostingId)
                        ->where('freelancer_id', auth()->id())
                ),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'amount.required'    => 'Please enter your bid amount.',
            'amount.min'         => 'Bid amount must be at least 1.',
            'proposal.required'  => 'Please write a proposal for this job.',
            'proposal.min'       => 'Your proposal must be at least 20 characters.',
            'proposal.max'       => 'Your proposal cannot exceed 5000 characters.',
            'no_duplicate'       => 'You have already placed a bid on this job.',
        ];
    }
}