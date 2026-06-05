import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Welcome to BlitzJobs</h1>
      <Link to="/jobs" className="mt-4 inline-block text-blue-600 underline">
        Go to Jobs Listing Page &rarr;
      </Link>
    </div>
  );
};