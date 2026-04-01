import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

/**
 * Toast Notification Component
 *
 * Displays flash messages (success/error) from Laravel backend.
 * Automatically dismisses after 5 seconds.
 *
 * @param {Object} props
 * @param {() => void} props.onDismiss - Callback when toast is dismissed
 */
export default function Toast({ onDismiss }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success || flash?.error) {
            const timer = setTimeout(() => {
                onDismiss?.();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash, onDismiss]);

    if (!flash?.success && !flash?.error) {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm animate-fade-in-down">
            {flash.success && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-lg">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium text-green-800">{flash.success}</p>
                        </div>
                        <button
                            onClick={onDismiss}
                            className="ml-4 inline-flex text-green-500 hover:text-green-700 focus:outline-none"
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {flash.error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium text-red-800">{flash.error}</p>
                        </div>
                        <button
                            onClick={onDismiss}
                            className="ml-4 inline-flex text-red-500 hover:text-red-700 focus:outline-none"
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
