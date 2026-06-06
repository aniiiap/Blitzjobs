import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const navItems = [
    { label: 'Overview', path: '/dashboard' },
    { label: 'Find Jobs', path: '/jobs' },
    { label: 'Applications', path: '/applications' },
    { label: 'Profile', path: '/profile' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40 w-full text-gray-900 dark:text-gray-100 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <div className="flex items-center">
            <Link to="/" className="text-xl font-black tracking-tight text-blue-600 flex items-center gap-1.5 select-none">
              <span>⚡</span> BlitzJobs
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              type="button"
              className="ml-2 p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700 text-sm font-bold transition-all hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm font-bold border border-gray-100 dark:border-gray-700"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <span className="text-xl font-bold px-1">✕</span> : <span className="text-xl font-bold px-0.5">☰</span>}
            </button>
          </div>

        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 pt-2 pb-4 space-y-1 transition-all">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                isActive(item.path)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
