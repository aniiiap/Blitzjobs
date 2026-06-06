import React, { useState } from 'react';
import { useBoard } from '../../context/BoardContext';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const { activeUser, applications } = useBoard();

  const totalApps = applications.length;
  
  // FIXED: Type-safe filter matching your 5-stage lifecycle database
  const activeCount = applications.filter(a => a.status !== 'REJECTED').length;
  const interviewCount = applications.filter(a => a.status === 'SHORTLISTED').length;

  // Track active real-time status notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      type: 'NEXT_STEP',
      title: 'Next Step: System Design Round Scheduled',
      description: 'Your pipeline for Senior Frontend Engineer at Stripe has progressed. Prepare syntax-directed translation profiles and architectural variables.',
      timestamp: '10 minutes ago',
      badgeColor: 'bg-purple-50 text-purple-600 border-purple-100',
      icon: '🗓️',
      actionText: 'View Timeline',
      actionPath: '/applications'
    },
    {
      id: 'notif-2',
      type: 'STATUS_CHANGE',
      title: 'Application Status Update: Under Review',
      description: 'Linear has updated your application status for Product Engineer, Platform to "Under Review" following a core credential alignment check.',
      timestamp: '2 hours ago',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-100',
      icon: '🔍'
    },
    {
      id: 'notif-3',
      type: 'ALERT',
      title: 'Profile Optimization Suggestion Triggered',
      description: 'Your job readiness matrix flags a missing cloud instrumentation asset. Post an updated resume to recalculate matching probabilities.',
      timestamp: '1 day ago',
      badgeColor: 'bg-blue-50 text-blue-600 border-blue-100',
      icon: '⚡',
      actionText: 'Optimize Profile',
      actionPath: '/profile'
    }
  ]);

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-4 sm:p-8 max-w-6xl mx-auto space-y-6 font-sans">
      
      {/* Welcome Active Section (Matches image_e7d796.png Layout) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5 gap-4 text-left">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" /> Actively searching
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Good morning, <span className="italic font-serif font-medium">{activeUser.name.split(' ')[0]}</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">You're on a 4-day streak. 3 new roles match your profile today.</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-colors">Export report</button>
          <Link to="/jobs" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-100 transition-all">Browse jobs</Link>
        </div>
      </div>

      {/* Quantitative Analytics Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center text-sm shadow-3xs">🚀</div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">{totalApps}</div>
            <div className="text-[11px] font-semibold text-slate-700">Applications</div>
            <div className="text-[10px] text-blue-600 font-bold mt-0.5">+12 this week</div>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center text-sm shadow-3xs">👁</div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">1,284</div>
            <div className="text-[11px] font-semibold text-slate-700">Profile views</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">+18% velocity</div>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center text-sm shadow-3xs">📈</div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">{activeCount}</div>
            <div className="text-[11px] font-semibold text-slate-700">Recruiter reach</div>
            <div className="text-[10px] text-sky-600 font-bold mt-0.5">+5 active pools</div>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center text-sm shadow-3xs">🏆</div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">{interviewCount}</div>
            <div className="text-[11px] font-semibold text-slate-700">Interviews</div>
            <div className="text-[10px] text-amber-600 font-bold mt-0.5">In Shortlist</div>
          </div>
        </div>
      </div>

      {/* Main Core Metric Layout Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">
        
        {/* Left Side: Analytics & Notifications Deck */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Donut Chart 1: Resume Score */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">📄 Resume Score</h3>
                <Link to="/profile" className="text-[10px] text-blue-600 font-bold hover:underline">Improve ↗</Link>
              </div>
              <div className="flex items-center gap-6 py-2">
                <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="9" fill="transparent" />
                    <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="9" fill="transparent" 
                            strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * activeUser.resumeScore) / 100} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-slate-900">{activeUser.resumeScore}</span>
                    <span className="text-[8px] text-slate-400 font-bold uppercase">Of 100</span>
                  </div>
                </div>
                <ul className="text-[11px] text-slate-600 space-y-1.5 font-medium">
                  <li className="flex items-center gap-1"><span className="text-blue-500 font-bold">✓</span> Quantified impact in project metrics</li>
                  <li className="flex items-center gap-1"><span className="text-blue-500 font-bold">✓</span> Framework keywords matched to requirements</li>
                </ul>
              </div>
            </div>

            {/* Donut Chart 2: Employability Score */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">⚡ Employability Score</h3>
                <span className="text-[9px] text-emerald-600 bg-emerald-50 font-bold px-1.5 py-0.2 rounded-sm border border-emerald-100">High</span>
              </div>
              <div className="flex items-center gap-6 py-2">
                <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="9" fill="transparent" />
                    <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="9" fill="transparent" 
                            strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * 76) / 100} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-slate-900">76</span>
                    <span className="text-[8px] text-emerald-500 font-bold uppercase">Ready</span>
                  </div>
                </div>
                <div className="text-[10px] space-y-1.5 flex-grow font-semibold w-full">
                  <div className="flex justify-between"><span>React / TS</span><span className="text-slate-400">95%</span></div>
                  <div className="w-full h-1 bg-slate-100 rounded-full"><div className="h-full bg-emerald-500 rounded-full" style={{width:'95%'}} /></div>
                  <div className="flex justify-between"><span>System Design</span><span className="text-slate-400">70%</span></div>
                  <div className="w-full h-1 bg-slate-100 rounded-full"><div className="h-full bg-emerald-500 rounded-full" style={{width:'70%'}} /></div>
                </div>
              </div>
            </div>

          </div>

          {/* --- ACTIVE NOTIFICATIONS & UPDATE MONITOR --- */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono flex items-center gap-2">
                🔔 Notifications & Real-Time Funnel Signals
              </h3>
              <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                {notifications.length} Unread
              </span>
            </div>

            {notifications.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">All pipeline signal changes cleared.</p>
            ) : (
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className="p-4 bg-slate-50/60 border border-slate-200/50 rounded-xl flex items-start justify-between gap-4 transition-all hover:bg-slate-50"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="text-lg p-1.5 bg-white rounded-xl border border-slate-100 shadow-3xs flex-shrink-0">
                        {notif.icon}
                      </span>
                      <div className="space-y-1 text-xs min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[9px] font-mono font-bold border px-2 py-0.5 rounded-md ${notif.badgeColor}`}>
                            {notif.type.replace('_', ' ')}
                          </span>
                          <p className="font-extrabold text-slate-900 truncate">{notif.title}</p>
                        </div>
                        <p className="text-slate-500 font-medium leading-relaxed">{notif.description}</p>
                        <span className="text-[10px] text-slate-400 block font-medium">{notif.timestamp}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                      {notif.actionText && notif.actionPath && (
                        <Link 
                          to={notif.actionPath}
                          className="px-3 py-1 bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 text-[10px] font-bold rounded-lg shadow-3xs transition-all"
                        >
                          {notif.actionText}
                        </Link>
                      )}
                      <button 
                        onClick={() => clearNotification(notif.id)}
                        className="text-slate-300 hover:text-slate-500 font-bold px-1 text-sm"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Profile Completion Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-100/40 space-y-6">
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold tracking-widest text-blue-200 uppercase">Profile Completion Matrix</div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black tracking-tight">67%</span>
              <span className="text-xs text-blue-200 font-bold">complete</span>
            </div>
          </div>

          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: '67%' }} />
          </div>

          <ul className="text-xs space-y-2.5 font-medium text-blue-50/90 text-left">
            <li className="flex items-center gap-2"><span className="opacity-60">✔</span> Basic user core profile variables active</li>
            <li className="flex items-center gap-2"><span className="opacity-60">✔</span> Work experience chronology mapped</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full border border-white" /> Complete system portfolio block targets</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full border border-white" /> Link active video introduction links</li>
          </ul>

          <Link to="/profile" className="w-full py-2.5 bg-white text-blue-600 hover:bg-slate-50 font-bold text-xs rounded-xl block text-center shadow-md transition-colors">
            Complete profile →
          </Link>
        </div>

      </div>

    </div>
  );
};