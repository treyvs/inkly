<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBidRequest extends FormRequest
{
    /**
     * Only freelancers are authorized to place bids
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isFreelancer();
    }

    public function rules(): array
    {
        $jobPostingId = $this->route('job_posting')->id;

        return [
            'amount'   => ['required', 'numeric', 'min:1'],
            'proposal' => ['required', 'string', 'min:20'],
            // Prevent duplicate bids from the same freelancer on the same job
            'freelancer_id' => [
                Rule::unique('bids')->where(function ($query) use ($jobPostingId) {
                    return $query->where('job_posting_id', $jobPostingId)
                                 ->where('freelancer_id', auth()->id());
                }),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'amount.required'   => 'Please enter your bid amount.',
            'amount.min'        => 'Bid amount must be at least 50KES.',
            'proposal.required' => 'Please write a proposal for this job.',
            'proposal.min'      => 'Your proposal must be at least 20 characters.',
            'freelancer_id'     => 'You have already placed a bid on this job.',
        ];
    }
}