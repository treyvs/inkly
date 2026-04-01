import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Toast from '@/Components/Toast';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const isClient = user.role === 'client';

    /**
     * Dismiss flash message by visiting a neutral route
     */
    const dismissToast = () => {
        router.visit(window.location.pathname, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Toast Notifications */}
            <Toast onDismiss={dismissToast} />

            {/* ── TOP NAV ─────────────────────────────────────────── */}
            <nav className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">

                        {/* Left — Logo + Links */}
                        <div className="flex items-center gap-8">
                            {/* Logo */}
                            <Link href="/dashboard">
                                <span className="text-xl font-bold text-indigo-600 tracking-tight">
                                    in<span className="text-gray-800">KLY</span>
                                </span>
                            </Link>

                            {/* Nav Links */}
                            <div className="hidden sm:flex items-center gap-6">
                                <Link
                                    href="/dashboard"
                                    className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/job-postings"
                                    className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
                                >
                                    Browse Jobs
                                </Link>
                                {isClient && (
                                    <Link
                                        href="/job-postings/create"
                                        className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
                                    >
                                        Post a Job
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Right — User dropdown */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <button
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                                >
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden sm:block">{user.name}</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showingNavigationDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-xs text-gray-500">Signed in as</p>
                                            <p className="text-sm font-medium text-gray-800 truncate">{user.email}</p>
                                            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                isClient ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                            }`}>
                                                {isClient ? 'Client' : 'Freelancer'}
                                            </span>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            Log Out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ── PAGE HEADER ─────────────────────────────────────── */}
            {header && (
                <header className="bg-white shadow-sm border-b border-gray-100">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* ── PAGE CONTENT ────────────────────────────────────── */}
            <main>{children}</main>
        </div>
    );
}