<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJobPostingRequest extends FormRequest
{
    /**
     * Only the client who owns this posting can update it
     */
    public function authorize(): bool
    {
        $jobPosting = $this->route('job_posting');
        return auth()->check() && auth()->id() === $jobPosting->client_id;
    }

    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'min:5', 'max:255'],
            'description' => ['required', 'string', 'min:20'],
            'budget'      => ['required', 'numeric', 'min:1'],
            'status'      => ['required', 'in:open,in_progress,closed'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'       => 'Please provide a title for your job posting.',
            'description.required' => 'Please describe the job in detail.',
            'budget.required'      => 'Please set a budget for this job.',
            'status.in'            => 'Status must be open, in progress, or closed.',
        ];
    }
}