import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

/**
 * Dashboard Page
 *
 * Displays different content based on user role:
 * - Clients: See their job postings with bid counts
 * - Freelancers: See their submitted bids with job links
 */
export default function Dashboard({ auth, jobPostings, bids }) {
    const user = auth.user;
    const isClient = user.role === 'client';

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Status badge styles
    const statusStyles = {
        open: 'bg-green-100 text-green-700 ring-green-600/20',
        in_progress: 'bg-yellow-100 text-yellow-700 ring-yellow-600/20',
        closed: 'bg-red-100 text-red-700 ring-red-600/20',
    };

    // Bid status styles
    const bidStatusStyles = {
        pending: 'bg-amber-100 text-amber-700 ring-amber-600/20',
        accepted: 'bg-green-100 text-green-700 ring-green-600/20',
        rejected: 'bg-red-100 text-red-700 ring-red-600/20',
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Dashboard
                    </h2>
                    {isClient && (
                        <Link
                            href="/job-postings/create"
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Post a Job
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Welcome back, {user.name}!
                        </h1>
                        <p className="text-indigo-100">
                            {isClient
                                ? "Manage your job postings and review freelancer proposals"
                                : "Track your bids and find new opportunities"}
                        </p>
                    </div>

                    {/* CLIENT DASHBOARD */}
                    {isClient && jobPostings && jobPostings.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Your Job Postings
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {jobPostings.length} {jobPostings.length === 1 ? 'job' : 'jobs'}
                                </span>
                            </div>

                            <div className="grid gap-6">
                                {jobPostings.map((job) => (
                                    <div
                                        key={job.id}
                                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="text-lg font-semibold text-gray-900">
                                                        {job.title}
                                                    </h4>
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${statusStyles[job.status]}`}
                                                    >
                                                        {job.status.replace('_', ' ')}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                                    {job.description}
                                                </p>
                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {formatCurrency(job.budget)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                        </svg>
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {job.bids_count || 0} {job.bids_count === 1 ? 'bid' : 'bids'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-sm text-gray-500">
                                                            {formatDate(job.created_at)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <Link
                                                    href={route('job-postings.show', { job_posting: job.id })}
                                                    className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                                >
                                                    View Details
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                                {job.status === 'open' && (
                                                    <Link
                                                        href={route('job-postings.edit', { job_posting: job.id })}
                                                        className="text-xs text-gray-500 hover:text-gray-700"
                                                    >
                                                        Edit
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CLIENT - No job postings */}
                    {isClient && (!jobPostings || jobPostings.length === 0) && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No job postings yet
                            </h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                Create your first job posting to start receiving proposals from talented writers.
                            </p>
                            <Link
                                href="/job-postings/create"
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Post Your First Job
                            </Link>
                        </div>
                    )}

                    {/* FREELANCER DASHBOARD */}
                    {!isClient && bids && bids.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Your Bids
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {bids.length} {bids.length === 1 ? 'bid' : 'bids'}
                                </span>
                            </div>

                            <div className="grid gap-6">
                                {bids.map((bid) => (
                                    <div
                                        key={bid.id}
                                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="text-lg font-semibold text-gray-900">
                                                        {bid.jobPosting?.title || 'Unknown Job'}
                                                    </h4>
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${bidStatusStyles[bid.status]}`}
                                                    >
                                                        {bid.status}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                                    {bid.proposal}
                                                </p>
                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {formatCurrency(bid.amount)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-sm text-gray-500">
                                                            {formatDate(bid.created_at)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <Link
                                                    href={route('job-postings.show', { job_posting: bid.jobPosting?.id })}
                                                    className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                                >
                                                    View Job
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FREELANCER - No bids */}
                    {!isClient && (!bids || bids.length === 0) && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No bids yet
                            </h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                Browse available jobs and submit proposals to start your freelancing journey.
                            </p>
                            <Link
                                href="/job-postings"
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Browse Jobs
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
