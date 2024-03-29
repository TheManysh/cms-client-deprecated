import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';

export default function NotFoundPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center h-full">
        <div className="my-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl">Page not found</h1>
                <p className="mt-1 text-base text-gray-500 dark:text-gray-300">Please check the URL in the address bar and try again.</p>
              </div>
              <div className="flex mt-10 space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link href="/">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Go back home
                  </a>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
