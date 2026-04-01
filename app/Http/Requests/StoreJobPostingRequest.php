<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreJobPostingRequest extends FormRequest
{
    /**
     * FIX: Was hardcoded to `return false` — blocked ALL job creation with 403.
     * Now correctly checks that the authenticated user has the 'client' role.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isClient();
    }

    /**
     * FIX: Rules array was completely empty.
     * No validation was running, meaning $request->validated() returned []
     * and only 'status' => 'open' was ever saved to the database.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'min:5', 'max:255'],
            'description' => ['required', 'string', 'min:20'],
            'budget'      => ['required', 'numeric', 'min:1', 'max:999999.99'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'       => 'Please provide a title for your job posting.',
            'title.min'            => 'The title must be at least 5 characters.',
            'description.required' => 'Please describe what you need in detail.',
            'description.min'      => 'The description must be at least 20 characters.',
            'budget.required'      => 'Please set a budget for this job.',
            'budget.numeric'       => 'Budget must be a valid number.',
            'budget.min'           => 'Budget must be at least 1.',
        ];
    }
}