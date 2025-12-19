import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-200 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="mt-4 text-gray-500">
                Page not found
            </p>
            <Link
                href="/"
                className="text-blue-600 hover:underline font-inter"
            >
                Back to Home
            </Link>
        </div>
    );
}
