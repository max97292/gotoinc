import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-lg mb-6">
          It might have been moved or deleted. But don't worry, you can always
          go back to the homepage.
        </p>
        <Link
          href="/"
          className="bg-white text-black font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
