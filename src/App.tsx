import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { BoardProvider, useBoard } from './context/BoardContext';
import { DashboardPage } from './pages/Dashboard';
import { JobsListingPage } from './pages/JobsListing';
import { ApplicationsPage } from './pages/Applications';
import { ProfilePage } from './pages/Profile';

// --- VIBRANT BLUE-GRADIENT LANDING HUB (image_e7edfc.png Alignment) ---
const LandingPage: React.FC = () => {
  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-[calc(100vh-4rem)] flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-12 font-sans selection:bg-blue-100">
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center my-auto space-y-8">
        
        {/* Colorful Glow Pill Status Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-50 border border-blue-200/60 rounded-full shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-blue-700">
            ▪ SYSTEM ONLINE: COGNITIVE MATCH SUITE ACTIVE
          </span>
        </div>

        {/* Dynamic Title Node with Deep Indigo Gradient */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-slate-900">
          Your career, <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">synthesized.</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Stop searching, start matching. BlitzJobs processes structured data layers to align 
          your professional credentials with 98% tracking accuracy.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link to="/dashboard" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full text-xs hover:opacity-95 transition-all shadow-md shadow-blue-200">
            Open Workspace
          </Link>
          <Link to="/jobs" className="px-6 py-3 bg-white text-slate-700 font-bold rounded-full text-xs border border-slate-200 hover:bg-slate-50 transition-all shadow-2xs">
            Find Opportunities
          </Link>
        </div>

        {/* Multi-Colored Quantitative Counter Fields */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-3xl mx-auto border-t border-slate-200">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">98%</div>
            <div className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Match Accuracy</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">4.2x</div>
            <div className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Velocity Scalar</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 tracking-tight">120K+</div>
            <div className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Active Operators</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-purple-600 tracking-tight">3,400</div>
            <div className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Corporate Anchors</div>
          </div>
        </div>
      </div>

      {/* Grid Highlights with Custom Background Accent Tints */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mx-auto mt-16 pt-8 border-t border-slate-200">
        <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-3 text-left shadow-2xs border-t-4 border-t-blue-500">
          <span className="text-[10px] font-bold text-blue-600 font-mono block">01</span>
          <h4 className="text-sm font-bold text-slate-800">Intelligence Console</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Live readiness tracking metrics, resume health analysis, and contextual optimization tasks.
          </p>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-3 text-left shadow-2xs border-t-4 border-t-emerald-500">
          <span className="text-[10px] font-bold text-emerald-600 font-mono block">02</span>
          <h4 className="text-sm font-bold text-slate-800">Job Discovery</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Organic job directory processing tailored specifically around candidate background vectors.
          </p>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-3 text-left shadow-2xs border-t-4 border-t-purple-500">
          <span className="text-[10px] font-bold text-purple-600 font-mono block">03</span>
          <h4 className="text-sm font-bold text-slate-800">Application Pipeline</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Advanced multi-stage recruitment milestone mapping featuring automated tracking metrics.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- AUTH PORTAL SECURE ACCESS FRAMEWORK ---
const AuthPortalPage: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
  const { updateActiveUser } = useBoard();
  const [viewMode, setViewMode] = useState<'SIGN_IN' | 'SIGN_UP' | 'OTP_VERIFICATION'>('SIGN_IN');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem('user_email') || 'docfyle@email.com';
    const storedPass = localStorage.getItem('user_pass') || '1234';

    if (email.toLowerCase().trim() === storedEmail && password === storedPass) {
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Please verify your entries.');
    }
  };

  const handleSignUpInit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) {
      setError('Required registration parameters are empty.');
      return;
    }
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setError('');
    alert(`[BLITZJOBS OTP SIMULATION]\nVerification token sent to ${email} is: ${newOtp}`);
    setViewMode('OTP_VERIFICATION');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput === generatedOtp) {
      localStorage.setItem('user_email', email.toLowerCase().trim());
      localStorage.setItem('user_name', username);
      localStorage.setItem('user_pass', '1234');

      updateActiveUser({
        name: username,
        email: email.toLowerCase().trim(),
        companyWorking: "Pending System Validation",
        experienceYears: "0"
      });

      alert('Verification sequence success. Access with system key: 1234');
      setViewMode('SIGN_IN');
      setPassword('1234');
    } else {
      setError('OTP token signature mismatch.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 font-sans text-slate-900">
      <div className="max-w-md w-full space-y-6 bg-white border border-slate-200 p-8 rounded-2xl shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-base mx-auto tracking-tighter shadow-sm">
            BJ
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            {viewMode === 'SIGN_IN' && "Login to BlitzJobs"}
            {viewMode === 'SIGN_UP' && "Register Node Workspace"}
            {viewMode === 'OTP_VERIFICATION' && "Secure Authorization Loop"}
          </h2>
        </div>

        {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg text-center font-medium">{error}</div>}

        {viewMode === 'SIGN_IN' && (
          <form className="space-y-4 text-xs" onSubmit={handleSignIn}>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="docfyle@email.com" className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Access Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" />
            </div>
            <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg transition-all text-xs shadow-md shadow-blue-100">Authenticate Session</button>
            <div className="text-center pt-2">
              <button type="button" onClick={() => setViewMode('SIGN_UP')} className="text-blue-600 hover:underline font-semibold">New user registration? Create an account</button>
            </div>
          </form>
        )}

        {viewMode === 'SIGN_UP' && (
          <form className="space-y-4 text-xs" onSubmit={handleSignUpInit}>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">User Name</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Amit Choudhary" className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="yourname@domain.com" className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" />
            </div>
            <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all text-xs shadow-sm">Dispatch Verification OTP</button>
            <div className="text-center pt-2">
              <button type="button" onClick={() => setViewMode('SIGN_IN')} className="text-slate-500 hover:underline font-semibold">Already have an account? Sign In</button>
            </div>
          </form>
        )}

        {viewMode === 'OTP_VERIFICATION' && (
          <form className="space-y-4 text-xs" onSubmit={handleVerifyOtp}>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Enter OTP Code</label>
              <input type="text" required maxLength={4} value={otpInput} onChange={(e) => setOtpInput(e.target.value)} placeholder="0000" className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-950 text-center font-mono text-base tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all text-xs shadow-sm">Verify & Complete Registration</button>
          </form>
        )}
      </div>
    </div>
  );
};

// --- STYLIZED NAVIGATION HEADER (Matches image_e7edfc.png Layout) ---
const GlobalEnterpriseHeader: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const location = useLocation();
  const { activeUser } = useBoard();

  const navigationItems = [
    { path: '/dashboard', label: 'Overview' },
    { path: '/jobs', label: 'Available Positions' },
    { path: '/applications', label: 'Application Board' },
    { path: '/profile', label: 'Account Profile' }
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50 font-sans text-xs shadow-xs">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* BlitzJobs Brand Logo Badge Container */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs shadow-blue-400/20">B</div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900">
            Blitz<span className="text-blue-600">Jobs</span>
          </span>
        </Link>

        {/* Center Linked Options Header Matrix */}
        <nav className="hidden md:flex items-center gap-1">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 shadow-3xs' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls Right Panel */}
        <div className="flex items-center gap-4">
          <button onClick={onLogout} className="text-[10px] tracking-wider uppercase font-bold text-slate-400 hover:text-rose-600 transition-colors">
            Sign Out
          </button>
          <Link to="/profile" className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold text-[10px] shadow-2xs">
            {activeUser.name ? activeUser.name.slice(0, 2).toUpperCase() : "US"}
          </Link>
        </div>
      </div>
    </header>
  );
};

function AppContent({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col selection:bg-blue-100">
      <GlobalEnterpriseHeader onLogout={onLogout} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/jobs" element={<JobsListingPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="w-full bg-white border-t border-slate-200 py-6 text-[10px] text-slate-400 font-mono tracking-wider text-center">
        &copy; 2026 BlitzJobs Platforms. All rights reserved. Powered by Clean Colorful Infrastructure.
      </footer>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth_session') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('auth_session', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_session');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <BoardProvider>
        <Router>
          {!isAuthenticated ? (
            <AuthPortalPage onLoginSuccess={handleLogin} />
          ) : (
            <AppContent onLogout={handleLogout} />
          )}
        </Router>
      </BoardProvider>
    </ThemeProvider>
  );
}