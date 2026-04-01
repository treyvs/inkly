import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

/**
 * Create Job Posting Page
 *
 * Allows clients to create new job postings with:
 * - Title (required, 5-255 chars)
 * - Description (required, min 20 chars)
 * - Budget (required, numeric, min $1)
 */
export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        budget: '',
    });

    const [touched, setTouched] = useState({
        title: false,
        description: false,
        budget: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('job-postings.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    // Character count for description
    const descriptionLength = data.description.length;
    const descriptionMinLength = 20;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Post a New Job
                    </h2>
                    <Link
                        href="/job-postings"
                        className="text-sm text-gray-600 hover:text-indigo-600 transition"
                    >
                        ← Back to Jobs
                    </Link>
                </div>
            }
        >
            <Head title="Post a Job" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                            <h3 className="text-xl font-bold text-white">
                                Job Details
                            </h3>
                            <p className="text-indigo-100 text-sm mt-1">
                                Fill in the information to attract the best writers
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="p-8 space-y-8">
                            {/* Title Field */}
                            <div>
                                <InputLabel
                                    htmlFor="title"
                                    value="Job Title"
                                />
                                <p className="text-xs text-gray-500 mt-1 mb-2">
                                    Be specific and descriptive (e.g., "Blog Writer Needed for Tech Startup")
                                </p>
                                <TextInput
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                                    autoComplete="off"
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    onBlur={() => handleBlur('title')}
                                    required
                                    isFocused
                                    placeholder="e.g., SEO Content Writer for SaaS Company"
                                />
                                <InputError
                                    message={touched.title ? errors.title : null}
                                    className="mt-2"
                                />
                            </div>

                            {/* Description Field */}
                            <div>
                                <InputLabel
                                    htmlFor="description"
                                    value="Job Description"
                                />
                                <p className="text-xs text-gray-500 mt-1 mb-2">
                                    Describe the project, requirements, and deliverables in detail
                                </p>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 min-h-[200px] resize-y"
                                    autoComplete="off"
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    onBlur={() => handleBlur('description')}
                                    required
                                    placeholder="Describe what you need, including:&#10;• Project scope and goals&#10;• Content type and format&#10;• Target audience&#10;• Word count or volume&#10;• Timeline and deadlines&#10;• Any specific requirements"
                                />
                                <div className="flex items-center justify-between mt-2">
                                    <InputError
                                        message={touched.description ? errors.description : null}
                                        className="mt-0"
                                    />
                                    <span
                                        className={`text-xs font-medium ${
                                            descriptionLength < descriptionMinLength
                                                ? 'text-amber-600'
                                                : 'text-green-600'
                                        }`}
                                    >
                                        {descriptionLength} / {descriptionMinLength}+ characters
                                    </span>
                                </div>
                            </div>

                            {/* Budget Field */}
                            <div>
                                <InputLabel
                                    htmlFor="budget"
                                    value="Budget (USD)"
                                />
                                <p className="text-xs text-gray-500 mt-1 mb-2">
                                    Set a fair price for the work. Higher budgets attract more qualified writers.
                                </p>
                                <div className="relative mt-1">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">
                                        $
                                    </span>
                                    <TextInput
                                        id="budget"
                                        name="budget"
                                        type="number"
                                        step="0.01"
                                        min="1"
                                        max="999999.99"
                                        value={data.budget}
                                        className="block w-full pl-8 pr-4 rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 text-lg font-medium"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setData('budget', e.target.value)
                                        }
                                        onBlur={() => handleBlur('budget')}
                                        required
                                        placeholder="500.00"
                                    />
                                </div>
                                <InputError
                                    message={touched.budget ? errors.budget : null}
                                    className="mt-2"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-4">
                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing}
                                        className="px-8 py-3 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                                    >
                                        {processing ? (
                                            <span className="flex items-center gap-2">
                                                <svg
                                                    className="animate-spin h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Posting...
                                            </span>
                                        ) : (
                                            'Post Job Now'
                                        )}
                                    </PrimaryButton>
                                    <Link
                                        href="/job-postings"
                                        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Info Card */}
                    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <div className="flex gap-3">
                            <svg
                                className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div>
                                <h4 className="text-sm font-semibold text-amber-800">
                                    Tips for a Great Job Post
                                </h4>
                                <ul className="mt-2 text-sm text-amber-700 space-y-1">
                                    <li>• Be clear about deliverables and expectations</li>
                                    <li>• Include examples or references if possible</li>
                                    <li>• Set a realistic budget for quality work</li>
                                    <li>• Mention your preferred timeline upfront</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
