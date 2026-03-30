import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, jobPostings }) {
    const [search, setSearch] = useState('');
    const user = auth.user;
    const isClient = user.role === 'client';

    const filtered = jobPostings?.data?.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const statusColor = (status) => {
        if (status === 'open') return 'bg-green-100 text-green-700';
        if (status === 'in_progress') return 'bg-yellow-100 text-yellow-700';
        return 'bg-red-100 text-red-500';
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Browse Jobs
                    </h2>
                    {isClient && (
                        <Link
                            href="/job-postings/create"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                        >
                            + Post a Job
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Browse Jobs" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* ── SEARCH BAR ──────────────────────────────────── */}
                <div className="mb-8">
                    <div className="relative max-w-xl">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search jobs by title or description..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
                        />
                    </div>
                </div>

                {/* ── STATS ROW ───────────────────────────────────── */}
                <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{filtered.length}</span>
                    <span>open {filtered.length === 1 ? 'job' : 'jobs'} available</span>
                </div>

                {/* ── JOB CARDS ───────────────────────────────────── */}
                {filtered.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map(job => (
                            <div
                                key={job.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
                            >
                                {/* Top */}
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <h3 className="font-semibold text-gray-800 text-base leading-snug">
                                            {job.title}
                                        </h3>
                                        <span className={`shrink-0 text-xs font-medium px-2 py-1 rounded-full capitalize ${statusColor(job.status)}`}>
                                            {job.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
                                        {job.description}
                                    </p>
                                </div>

                                {/* Bottom */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="text-xs text-gray-400">Budget</p>
                                            <p className="text-lg font-bold text-indigo-600">
                                                ${Number(job.budget).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">Posted by</p>
                                            <p className="text-sm font-medium text-gray-600">
                                                {job.client?.name || 'Client'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-400">
                                            {job.bids_count ?? 0} bid{job.bids_count !== 1 ? 's' : ''}
                                        </span>
                                        <Link
                                            href={`/job-postings/${job.id}`}
                                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
                        <div className="text-4xl mb-4">📋</div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            No jobs found
                        </h3>
                        <p className="text-sm text-gray-400 mb-6">
                            {search ? 'Try a different search term.' : 'No open jobs at the moment.'}
                        </p>
                        {isClient && (
                            <Link
                                href="/job-postings/create"
                                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition"
                            >
                                Post the First Job
                            </Link>
                        )}
                    </div>
                )}

                {/* ── PAGINATION ──────────────────────────────────── */}
                {jobPostings?.links && (
                    <div className="mt-8 flex justify-center gap-2">
                        {jobPostings.links.map((link, i) => (
                            <button
                                key={i}
                                onClick={() => link.url && router.visit(link.url)}
                                disabled={!link.url}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                                    link.active
                                        ? 'bg-indigo-600 text-white'
                                        : link.url
                                        ? 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}