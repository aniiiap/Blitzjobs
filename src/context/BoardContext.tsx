import React, { createContext, useContext, useState } from 'react';

export interface TimelineStep {
  label: string;
  date: string;
  description: string;
  completed: boolean;
}

export interface ApplicationCard {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  appliedDate: string;
  matchPercentage: number;
  // UPDATED: Funnel stages perfectly mapped to match your 5-stage UI tracking pipeline
  status: 'APPLIED' | 'REVIEWING' | 'SHORTLISTED' | 'REJECTED' | 'SELECTED';
  timeline: TimelineStep[];
}

interface UserProfileData {
  name: string;
  email: string;
  phoneNumber: string;
  companyWorking: string;
  experienceYears: string;
  resumeScore: number;
  atsParseability: number;
  experienceDepth: number;
  keywordDensity: number;
  impactMetrics: number;
}

interface BoardContextType {
  applications: ApplicationCard[];
  addApplication: (title: string, company: string, location: string, salary: string, match: number) => void;
  shiftStatus: (id: string, direction: 'LEFT' | 'RIGHT') => void;
  activeUser: UserProfileData;
  updateActiveUser: (data: Partial<UserProfileData>) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<ApplicationCard[]>([
    {
      id: 'app-1',
      title: 'Senior Frontend Engineer',
      company: 'Stripe',
      location: 'Bengaluru • Hybrid',
      salary: '₹48-62 LPA',
      appliedDate: 'May 18, 2026',
      matchPercentage: 96,
      status: 'SELECTED', // Updated to match the post-selection flow
      timeline: [
        { label: 'Applied', date: 'May 18, 2026', description: 'Application submitted via platform.', completed: true },
        { label: 'Under Review', date: 'May 20, 2026', description: 'Recruiter screened your profile metrics.', completed: true },
        { label: 'Shortlisted', date: 'May 22, 2026', description: 'Hiring manager requested connection loop.', completed: true },
        { label: 'Interview', date: 'May 28, 2026', description: 'System design round scheduled.', completed: true },
        { label: 'Selected', date: 'May 30, 2026', description: 'Final cultural round feedback confirmation.', completed: true }
      ]
    },
    {
      id: 'app-2',
      title: 'Product Engineer, Platform',
      company: 'Linear',
      location: 'Remote • India',
      salary: '₹42-55 LPA',
      appliedDate: 'May 15, 2026',
      matchPercentage: 91,
      status: 'REVIEWING',
      timeline: [
        { label: 'Applied', date: 'May 15, 2026', description: 'Profile parsed directly into backend index.', completed: true },
        { label: 'Under Review', date: 'May 19, 2026', description: 'Technical assessment review cycle.', completed: true },
        { label: 'Shortlisted', date: 'Pending', description: 'Awaiting scheduling team invitation.', completed: false }
      ]
    }
  ]);

  const [activeUser, setActiveUser] = useState<UserProfileData>({
    name: "Amit Choudhary",
    email: "docfyle@email.com",
    phoneNumber: "+91 98765 43210",
    companyWorking: "Docfyle Platforms",
    experienceYears: "4",
    resumeScore: 82,
    atsParseability: 88,
    experienceDepth: 82,
    keywordDensity: 71,
    impactMetrics: 56
  });

  const addApplication = (title: string, company: string, location: string, salary: string, match: number) => {
    const newApp: ApplicationCard = {
      id: `app-${Date.now()}`,
      title,
      company,
      location,
      salary,
      appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      matchPercentage: match,
      status: 'APPLIED',
      timeline: [
        { label: 'Applied', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), description: 'Application processed natively.', completed: true },
        { label: 'Under Review', date: 'Pending', description: 'Awaiting baseline screening.', completed: false }
      ]
    };
    setApplications((prev) => [newApp, ...prev]);
  };

  const shiftStatus = (id: string, direction: 'LEFT' | 'RIGHT') => {
    // Array order modified to support your exact 5-stage flow sequence
    const statusOrder: ApplicationCard['status'][] = ['APPLIED', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'SELECTED'];
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== id) return app;
        const currentIndex = statusOrder.indexOf(app.status);
        let nextIndex = direction === 'RIGHT' ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex < 0 || nextIndex >= statusOrder.length) return app;
        return { ...app, status: statusOrder[nextIndex] };
      })
    );
  };

  const updateActiveUser = (data: Partial<UserProfileData>) => {
    setActiveUser((prev) => ({ ...prev, ...data }));
  };

  return (
    <BoardContext.Provider value={{ applications, addApplication, shiftStatus, activeUser, updateActiveUser }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error('useBoard must be used within a BoardProvider');
  return context;
};