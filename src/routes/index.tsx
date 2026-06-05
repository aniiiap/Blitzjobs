import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { LandingPage } from '../pages/Landing/index';
import { JobsListingPage } from '../pages/JobsListing/index';
import { JobDetailsPage } from '../pages/JobDetails/index';
import { DashboardPage } from '../pages/Dashboard/index';
import { ApplicationsPage } from '../pages/Applications/index';
import { ProfilePage } from '../pages/Profile/index';

// High-performance reusable wrapper component for unified page transition states
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="flex-grow flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
};

export const AppRoutes: React.FC = () => {
  // Grab the location key so AnimatePresence knows exactly when the route changes
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
        <Route path="/jobs" element={<PageWrapper><JobsListingPage /></PageWrapper>} /> 
        <Route path="/jobs/:id" element={<PageWrapper><JobDetailsPage /></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><DashboardPage /></PageWrapper>} />
        <Route path="/applications" element={<PageWrapper><ApplicationsPage /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><ProfilePage /></PageWrapper>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};