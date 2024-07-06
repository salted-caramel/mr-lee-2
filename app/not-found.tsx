import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 p-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-100">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-200">
          Page Not Found
        </h2>
        <p className="mt-2 text-lg text-gray-200">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
