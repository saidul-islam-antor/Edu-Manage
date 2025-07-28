import React from 'react';
import { Link } from 'react-router';
import { FaLock } from 'react-icons/fa';

const Forbidden = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-base-200 px-4 text-center">
      <div className="max-w-md">
        <div className="text-red-500 text-6xl mb-4">
          <FaLock />
        </div>
        <h1 className="text-5xl font-bold text-error">403 Forbidden</h1>
        <p className="py-6 text-base-content">
          Sorry! You don’t have permission to access this page.
        </p>
        <Link to="/">
          <button className="btn btn-primary mt-4">← Go to Homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
