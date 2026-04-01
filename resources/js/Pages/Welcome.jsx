import { Head, Link } from '@inertiajs/react';

/**
 * Welcome / Landing Page
 *
 * Professional homepage for inKLY - a freelance writing marketplace.
 * Features:
 * - Hero section with value proposition
 * - How it works section
 * - Features/benefits
 * - Call-to-action for both clients and freelancers
 */
export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to inKLY - Freelance Writing Marketplace" />

            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-indigo-600 tracking-tight">
                                    in<span className="text-gray-800">KLY</span>
                                </span>
                            </div>

                            {/* Right side auth links */}
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="text-gray-700 hover:text-indigo-600 font-medium px-4 py-2.5 transition"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                                Connect with Top<br />
                                <span className="text-indigo-200">Writing Talent</span>
                            </h1>
                            <p className="mt-6 text-xl text-indigo-100 max-w-2xl mx-auto">
                                inKLY is the premier marketplace where businesses find exceptional writers
                                and freelancers discover amazing opportunities.
                            </p>

                            {/* CTA Buttons */}
                            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                                {!auth.user ? (
                                    <>
                                        <Link
                                            href="/register?role=client"
                                            className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl hover:bg-indigo-50 transition shadow-lg"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.755M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Hire a Writer
                                        </Link>
                                        <Link
                                            href="/register?role=freelancer"
                                            className="inline-flex items-center justify-center gap-2 bg-indigo-500/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-500/50 transition backdrop-blur-sm border border-white/20"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                            Find Work
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        href="/job-postings"
                                        className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl hover:bg-indigo-50 transition shadow-lg"
                                    >
                                        Browse Jobs
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Wave separator */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
                        </svg>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                How inKLY Works
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                Whether you're hiring or looking for work, our platform makes it simple
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            {/* For Clients */}
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 lg:p-10">
                                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.755M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Clients</h3>
                                <ol className="space-y-6">
                                    <li className="flex gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Post a Job</h4>
                                            <p className="text-gray-600 mt-1">Describe your project, set your budget, and publish in minutes.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Review Proposals</h4>
                                            <p className="text-gray-600 mt-1">Receive bids from qualified writers with their proposals and rates.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Hire & Collaborate</h4>
                                            <p className="text-gray-600 mt-1">Choose the best fit and work together to create amazing content.</p>
                                        </div>
                                    </li>
                                </ol>
                            </div>

                            {/* For Freelancers */}
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 lg:p-10">
                                <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Freelancers</h3>
                                <ol className="space-y-6">
                                    <li className="flex gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Browse Jobs</h4>
                                            <p className="text-gray-600 mt-1">Explore opportunities that match your skills and interests.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Submit Proposals</h4>
                                            <p className="text-gray-600 mt-1">Send compelling bids showcasing your expertise and approach.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Get Hired</h4>
                                            <p className="text-gray-600 mt-1">Connect with clients and build your writing career.</p>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                Why Choose inKLY?
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                Built for writers and clients who value quality and professionalism
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Talent</h3>
                                <p className="text-gray-600">Every freelancer is vetted to ensure quality and professionalism.</p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
                                <p className="text-gray-600">Clear budgets and competitive bids with no hidden fees.</p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Matching</h3>
                                <p className="text-gray-600">Connect with the right talent or opportunities in minutes.</p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Direct Communication</h3>
                                <p className="text-gray-600">Chat directly with clients or freelancers to discuss projects.</p>
                            </div>

                            {/* Feature 5 */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Proposals</h3>
                                <p className="text-gray-600">Freelancers provide comprehensive proposals for your review.</p>
                            </div>

                            {/* Feature 6 */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
                                <p className="text-gray-600">Our team is always here to help you succeed.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-indigo-100 mb-10">
                            Join hundreds of clients and freelancers already using inKLY
                        </p>
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/register?role=client"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl hover:bg-indigo-50 transition shadow-lg"
                                >
                                    Create Free Account
                                </Link>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center gap-2 bg-indigo-500/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-500/50 transition backdrop-blur-sm border border-white/20"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                        {auth.user && (
                            <Link
                                href="/job-postings"
                                className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl hover:bg-indigo-50 transition shadow-lg"
                            >
                                Explore Jobs
                            </Link>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-white tracking-tight">
                                    in<span className="text-indigo-400">KLY</span>
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} inKLY. All rights reserved.
                            </p>
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-gray-400 hover:text-white transition text-sm">Privacy</a>
                                <a href="#" className="text-gray-400 hover:text-white transition text-sm">Terms</a>
                                <a href="#" className="text-gray-400 hover:text-white transition text-sm">Contact</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
