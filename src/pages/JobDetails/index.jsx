import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_JOBS } from '../../assets/JobsData';

export const JobDetailsPage = () => {
  const { id } = useParams();

  const job = MOCK_JOBS.find(j => j.id === id);

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-gray-900">
        <h2 className="text-2xl font-bold">Position Not Found</h2>
        <p className="text-gray-500 mt-2">The job listing you are looking for doesn't exist or has expired.</p>
        <Link to="/jobs" className="mt-6 inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm">
          Back to Jobs Stream
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-900 animate-fadeIn">
      <Link to="/jobs" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 gap-1.5 mb-6 group">
        <span className="transform group-hover:-translate-x-0.5 transition-transform">&larr;</span> Back to Listings
      </Link>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-2.5">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700">{job.type}</span>
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700">{job.experience} Level</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">{job.title}</h1>
            <p className="text-base font-medium text-gray-500">{job.company} • {job.location}</p>
          </div>
          <div className="w-full sm:w-auto text-left sm:text-right border-t sm:border-0 pt-4 sm:pt-0 border-gray-100">
            <span className="text-2xl font-black text-green-600 block">{job.salary}</span>
            <span className="text-xs text-gray-400 font-medium mt-1 block">Estimated Base Pay</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
          {job.tags.map(tag => (
            <span key={tag} className="text-xs font-bold bg-gray-50 text-gray-600 border border-gray-200/60 px-3 py-1.5 rounded-xl">{tag}</span>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Role Overview</h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            We are looking for a skilled candidate to join our core development workspace. In this position, you will own critical operational features, collaborate directly with cross-functional pipelines, and deliver high-performance design layouts using modern industry-standard frameworks.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Key Responsibilities</h3>
          <ul className="list-disc pl-5 text-sm sm:text-base text-gray-600 space-y-2">
            <li>Build clean, performant, and scale-ready code architectures.</li>
            <li>Maintain pixel-perfect implementations based on custom design language specifications.</li>
            <li>Optimize system performance targets for fluid micro-interactions.</li>
          </ul>
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => alert('Application placeholder submitted successfully!')}
            className="flex-grow inline-flex justify-center items-center px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-sm transition-colors"
          >
            Apply For This Position
          </button>
          <button
            onClick={() => alert('Position added to your application tracker bookmarks!')}
            className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm sm:text-base rounded-xl transition-colors"
          >
            Save Listing
          </button>
        </div>
      </div>
    </div>
  );
};
