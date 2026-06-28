import React from 'react';

const Error = ({ statusCode = 500, title, message, reset }) => {
  // Default messages config
  const errorDetails = {
    404: {
      defaultTitle: "Page Not Found",
      defaultMessage: "Oops! Apni jei page-ti khujchen sheti khuje paowa jayni ba remove kora hoyeche.",
    },
    500: {
      defaultTitle: "Something Went Wrong",
      defaultMessage: "Server ba hydration-e kono somossa hoyeche. Amra eiti thik korar chesta korchi.",
    }
  };

  const currentError = errorDetails[statusCode] || errorDetails[500];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto text-center">
        <main className="sm:flex sm:items-center sm:justify-center">
          {/* Status Code */}
          <p className="text-4xl font-extrabold text-blue-600 sm:text-5xl">
            {statusCode}
          </p>
          
          <div className="sm:ml-6 sm:border-l sm:border-gray-200 sm:pl-6 text-left">
            {/* Error Title */}
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              {title || currentError.defaultTitle}
            </h1>
            {/* Error Description */}
            <p className="mt-2 text-base text-gray-500">
              {message || currentError.defaultMessage}
            </p>
          </div>
        </main>

        {/* Action Buttons */}
        <div className="mt-10 flex space-x-3 justify-center sm:border-l sm:border-transparent sm:pl-6">
          {reset && (
            <button
              onClick={() => reset()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Abar Chesta Korun
            </button>
          )}
          
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Home-e Fire Jan
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error;