import { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

/**
 * Job Posting Show Page
 *
 * Displays:
 * - Full job details
 * - All bids (with visibility based on user role)
 * - Bid submission form (for freelancers)
 * - Accept/Reject buttons (for job owner)
 */
export default function Show({ auth, jobPosting, userBid, isOwner }) {
    const user = auth.user;
    const isFreelancer = user.role === 'freelancer';
    const hasAlreadyBidded = userBid !== null;

    // Bid form state
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: '',
        proposal: '',
    });

    const [touched, setTouched] = useState({
        amount: false,
        proposal: false,
    });

    const [showBidForm, setShowBidForm] = useState(false);

    const submitBid = (e) => {
        e.preventDefault();
        post(route('bids.store', { job_posting: jobPosting.id }), {
            onSuccess: () => {
                reset();
                setShowBidForm(false);
            },
        });
    };

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    // Accept bid handler
    const acceptBid = (bidId) => {
        if (window.confirm('Are you sure you want to accept this bid? This will reject all other pending bids.')) {
            router.patch(route('bids.accept', { bid: bidId }));
        }
    };

    // Reject bid handler
    const rejectBid = (bidId) => {
        if (window.confirm('Are you sure you want to reject this bid?')) {
            router.patch(route('bids.reject', { bid: bidId }));
        }
    };

    // Delete job handler
    const deleteJob = () => {
        if (window.confirm('Are you sure you want to delete this job posting? This cannot be undone.')) {
            router.delete(route('job-postings.destroy', { job_posting: jobPosting.id }));
        }
    };

    // Status badge styles
    const statusStyles = {
        open: 'bg-green-100 text-green-700 ring-green-600/20',
        in_progress: 'bg-yellow-100 text-yellow-700 ring-yellow-600/20',
        closed: 'bg-red-100 text-red-700 ring-red-600/20',
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Bid status styles
    const bidStatusStyles = {
        pending: 'bg-amber-100 text-amber-700 ring-amber-600/20',
        accepted: 'bg-green-100 text-green-700 ring-green-600/20',
        rejected: 'bg-red-100 text-red-700 ring-red-600/20',
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Job Details
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
            <Head title={jobPosting.title} />

            <div className="py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content - Job Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Job Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                {/* Header */}
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h1 className="text-2xl font-bold text-white">
                                                {jobPosting.title}
                                            </h1>
                                            <p className="text-indigo-100 text-sm mt-2">
                                                Posted by {jobPosting.client?.name} • {formatDate(jobPosting.created_at)}
                                            </p>
                                        </div>
                                        <span
                                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ring-1 ring-inset ${statusStyles[jobPosting.status]}`}
                                        >
                                            {jobPosting.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>

                                {/* Budget Badge */}
                                <div className="bg-indigo-50 px-8 py-4 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-indigo-600 font-medium uppercase tracking-wide">
                                                Budget
                                            </p>
                                            <p className="text-3xl font-bold text-indigo-700 mt-1">
                                                {formatCurrency(jobPosting.budget)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-indigo-600 font-medium uppercase tracking-wide">
                                                Bids
                                            </p>
                                            <p className="text-2xl font-bold text-indigo-700 mt-1">
                                                {jobPosting.bids?.length || 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="px-8 py-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Job Description
                                    </h3>
                                    <div className="prose prose-indigo max-w-none">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {jobPosting.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Owner Actions */}
                                {isOwner && jobPosting.status === 'open' && (
                                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                        <p className="text-sm text-gray-600">
                                            You posted this job. Manage bids and proposals below.
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={route('job-postings.edit', { job_posting: jobPosting.id })}
                                                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                            >
                                                Edit Job
                                            </Link>
                                            <button
                                                onClick={deleteJob}
                                                className="text-sm font-medium text-red-600 hover:text-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Bids Section */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="px-8 py-6 border-b border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {isOwner ? 'Bids & Proposals' : 'Your Bid Status'}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {isOwner
                                            ? `Review ${jobPosting.bids?.length || 0} freelancer proposals`
                                            : hasAlreadyBidded
                                            ? 'Your bid has been submitted'
                                            : 'Submit your proposal to work on this job'}
                                    </p>
                                </div>

                                {/* Bids List (for job owner) */}
                                {isOwner && jobPosting.bids && jobPosting.bids.length > 0 && (
                                    <div className="divide-y divide-gray-100">
                                        {jobPosting.bids.map((bid) => (
                                            <div
                                                key={bid.id}
                                                className="px-8 py-6 hover:bg-gray-50 transition"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                                                {bid.freelancer?.name?.charAt(0) || 'F'}
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-gray-900">
                                                                    {bid.freelancer?.name || 'Freelancer'}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {formatDate(bid.created_at)}
                                                                </p>
                                                            </div>
                                                            <span
                                                                className={`ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${bidStatusStyles[bid.status]}`}
                                                            >
                                                                {bid.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-700 leading-relaxed mb-4">
                                                            {bid.proposal}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-2xl font-bold text-indigo-600">
                                                                {formatCurrency(bid.amount)}
                                                            </p>
                                                            {bid.status === 'pending' && (
                                                                <div className="flex items-center gap-2">
                                                                    <SecondaryButton
                                                                        onClick={() => rejectBid(bid.id)}
                                                                        className="text-sm px-4 py-2"
                                                                    >
                                                                        Reject
                                                                    </SecondaryButton>
                                                                    <PrimaryButton
                                                                        onClick={() => acceptBid(bid.id)}
                                                                        className="text-sm px-4 py-2 bg-green-600 hover:bg-green-700"
                                                                    >
                                                                        Accept
                                                                    </PrimaryButton>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* No bids message (for owner) */}
                                {isOwner && (!jobPosting.bids || jobPosting.bids.length === 0) && (
                                    <div className="px-8 py-12 text-center">
                                        <div className="text-5xl mb-4">📬</div>
                                        <h4 className="text-lg font-semibold text-gray-700 mb-2">
                                            No bids yet
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Freelancers will start bidding once they see your job posting.
                                        </p>
                                    </div>
                                )}

                                {/* Freelancer bid status */}
                                {!isOwner && isFreelancer && hasAlreadyBidded && (
                                    <div className="px-8 py-8">
                                        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 text-center">
                                            <div className="text-4xl mb-3">✉️</div>
                                            <h4 className="text-lg font-semibold text-indigo-900 mb-2">
                                                Your Bid Submitted
                                            </h4>
                                            <p className="text-sm text-indigo-700 mb-4">
                                                You've proposed {formatCurrency(userBid.amount)} for this job.
                                            </p>
                                            <span
                                                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ring-1 ring-inset ${bidStatusStyles[userBid.status]}`}
                                            >
                                                Status: {userBid.status}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Job closed message */}
                                {jobPosting.status !== 'open' && (
                                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                                        <p className="text-sm text-gray-600">
                                            This job is currently <span className="font-medium">{jobPosting.status.replace('_', ' ')}</span> and no longer accepting new bids.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Action Card - Freelancer */}
                            {isFreelancer && !hasAlreadyBidded && jobPosting.status === 'open' && (
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-6">
                                    <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600">
                                        <h3 className="text-lg font-bold text-white">
                                            Submit Your Proposal
                                        </h3>
                                        <p className="text-indigo-100 text-sm mt-1">
                                            Show the client why you're the best fit
                                        </p>
                                    </div>

                                    <form onSubmit={submitBid} className="p-6 space-y-6">
                                        {/* Amount */}
                                        <div>
                                            <InputLabel htmlFor="amount" value="Your Bid (USD)" />
                                            <div className="relative mt-1">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                                    $
                                                </span>
                                                <TextInput
                                                    id="amount"
                                                    name="amount"
                                                    type="number"
                                                    step="0.01"
                                                    min="1"
                                                    max="999999.99"
                                                    value={data.amount}
                                                    className="block w-full pl-7 pr-4 rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5"
                                                    onChange={(e) => setData('amount', e.target.value)}
                                                    onBlur={() => handleBlur('amount')}
                                                    required
                                                    placeholder="0.00"
                                                />
                                            </div>
                                            <InputError
                                                message={touched.amount ? errors.amount : null}
                                                className="mt-1"
                                            />
                                        </div>

                                        {/* Proposal */}
                                        <div>
                                            <InputLabel htmlFor="proposal" value="Proposal" />
                                            <p className="text-xs text-gray-500 mt-1 mb-2">
                                                Explain your approach and why you're qualified
                                            </p>
                                            <textarea
                                                id="proposal"
                                                name="proposal"
                                                value={data.proposal}
                                                className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 min-h-[150px] resize-y"
                                                onChange={(e) => setData('proposal', e.target.value)}
                                                onBlur={() => handleBlur('proposal')}
                                                required
                                                placeholder="Hi! I'd love to help you with this project. Here's why I'm a great fit..."
                                            />
                                            <div className="flex items-center justify-between mt-2">
                                                <InputError
                                                    message={touched.proposal ? errors.proposal : null}
                                                    className="mt-0"
                                                />
                                                <span className="text-xs text-gray-400">
                                                    {data.proposal.length}+ chars
                                                </span>
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        <PrimaryButton
                                            type="submit"
                                            disabled={processing}
                                            className="w-full py-3 text-base font-semibold"
                                        >
                                            {processing ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Submitting...
                                                </span>
                                            ) : (
                                                'Submit Proposal'
                                            )}
                                        </PrimaryButton>
                                    </form>
                                </div>
                            )}

                            {/* Client can't bid message */}
                            {!isFreelancer && !isOwner && jobPosting.status === 'open' && (
                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                                    <p className="text-sm text-amber-800">
                                        Only freelancers can submit bids to job postings.
                                    </p>
                                </div>
                            )}

                            {/* Job Info Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <h4 className="font-semibold text-gray-900 mb-4">Job Information</h4>
                                <dl className="space-y-4">
                                    <div>
                                        <dt className="text-xs text-gray-500 uppercase tracking-wide">Posted</dt>
                                        <dd className="text-sm font-medium text-gray-900 mt-1">
                                            {formatDate(jobPosting.created_at)}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs text-gray-500 uppercase tracking-wide">Last Updated</dt>
                                        <dd className="text-sm font-medium text-gray-900 mt-1">
                                            {formatDate(jobPosting.updated_at)}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs text-gray-500 uppercase tracking-wide">Client</dt>
                                        <dd className="text-sm font-medium text-gray-900 mt-1">
                                            {jobPosting.client?.name || 'Unknown'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs text-gray-500 uppercase tracking-wide">Status</dt>
                                        <dd className="mt-1">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${statusStyles[jobPosting.status]}`}>
                                                {jobPosting.status.replace('_', ' ')}
                                            </span>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
