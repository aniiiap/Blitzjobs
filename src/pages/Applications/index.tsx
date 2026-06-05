import React, { useState } from 'react';
import { useBoard } from '../../context/BoardContext';

export const ApplicationsPage: React.FC = () => {
  const { applications, shiftStatus } = useBoard();
  const [expandedId, setExpandedId] = useState<string | null>('app-1');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const [onboardingDocs, setOnboardingDocs] = useState<{ [key: string]: string[] }>({
    'app-1': []
  });

  const stages: ('APPLIED' | 'REVIEWING' | 'SHORTLISTED' | 'REJECTED' | 'SELECTED')[] = [
    'APPLIED',
    'REVIEWING',
    'SHORTLISTED',
    'REJECTED',
    'SELECTED'
  ];

  const filteredApps = applications.filter((app) => {
    if (filterStatus === 'ALL') return true;
    return app.status === filterStatus;
  });

  const handleDocUpload = (appId: string, docType: string) => {
    setOnboardingDocs(prev => {
      const currentDocs = prev[appId] || [];
      if (currentDocs.includes(docType)) return prev;
      alert(`[BLITZJOBS CORE LOGISTICS]\nOnboarding verification asset "${docType}" successfully linked to application node.`);
      return { ...prev, [appId]: [...currentDocs, docType] };
    });
  };

  // --- DYNAMIC EMAIL MATRIX DICTIONARY (Idea 1 Logic Hub) ---
  const getFollowUpTemplate = (status: string, title: string, company: string) => {
    switch (status) {
      case 'APPLIED':
        return {
          subject: `Application Follow-Up: ${title} - Amit Choudhary`,
          body: `Dear Hiring Team,\n\nI hope this message finds you well. I recently submitted my resume for the open ${title} position at ${company}. Given my background in scaling frontend architectures and optimization matrices, I am incredibly excited about the role.\n\nCould you kindly confirm if my application payload has been received? Thank you for your time.\n\nBest regards,\nAmit Choudhary`
        };
      case 'REVIEWING':
        return {
          subject: `Inquiry: ${title} Interview Status Loop`,
          body: `Hi Team,\n\nFollowing up on my active application stream for the ${title} slot. My profile has been sitting in evaluation review for a few days, and I wanted to check if there are any additional engineering artifacts or sample portfolios I can supply to accelerate the decision matrix.\n\nLooking forward to your perspective.\n\nBest,\nAmit Choudhary`
        };
      case 'SHORTLISTED':
        return {
          subject: `Availability Matrix Confirmation - ${title} Interview`,
          body: `Dear Recruiting Team,\n\nThank you for shortlisting my profile! I am thrilled to advance into the technical evaluation loop. I have reviewed the calendar triggers and am fully available for a live System Design session this week.\n\nLet me know which scheduling options work best on your side.\n\nSincerely,\nAmit Choudhary`
        };
      case 'REJECTED':
        return {
          subject: `Feedback Inquiry & Future Network Sync - ${title}`,
          body: `Hi Team,\n\nThank you for the update regarding the ${title} selection cycle. While I am disappointed we won't be moving forward, I am deeply appreciative of the time spent. If the engineering panel has any quick feedback points regarding my system architecture evaluations, I would love to absorb them.\n\nLet's stay in loop for future opportunities.\n\nRegards,\nAmit Choudhary`
        };
      case 'SELECTED':
        return {
          subject: `Offer Acceptance Validation Stream - ${title}`,
          body: `Dear ${company} Onboarding Team,\n\nThank you for extending this formal selection offer! I have uploaded the requested compliance documents directly into the verification workspace dashboard.\n\nPlease let me know if there are any remaining background signatures required before the orientation protocol initiates.\n\nBest regards,\nAmit Choudhary`
        };
      default:
        return { subject: '', body: '' };
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Follow-Up copy successfully mirrored to your system clipboard!');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-4 sm:p-8 max-w-6xl mx-auto space-y-6 font-sans">
      
      {/* Navigation Header */}
      <div className="text-left border-b border-slate-200 pb-5 space-y-1">
        <div className="text-[10px] font-mono tracking-widest text-blue-600 font-bold uppercase">// WORKFLOW MANAGEMENT</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Your applications</h1>
        <p className="text-xs text-slate-500">{applications.length} applications • 5 active stages funnel</p>
      </div>

      {/* Segmented Filter Control Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-100 p-2 rounded-2xl shadow-2xs w-fit">
        <button
          onClick={() => setFilterStatus('ALL')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterStatus === 'ALL' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          All Pipelines
        </button>
        {stages.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === status ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {status === 'REVIEWING' ? 'Under Review' : status}
          </button>
        ))}
      </div>

      {/* Interactive Application List Stream */}
      <div className="space-y-4">
        {filteredApps.map((app) => {
          const isOpen = expandedId === app.id;
          const uploadedList = onboardingDocs[app.id] || [];
          const emailTemplate = getFollowUpTemplate(app.status, app.title, app.company);
          
          const getStatusStyles = (status: string) => {
            switch(status) {
              case 'APPLIED': return 'bg-blue-50 text-blue-600 border-blue-100';
              case 'REVIEWING': return 'bg-amber-50 text-amber-600 border-amber-100';
              case 'SHORTLISTED': return 'bg-purple-50 text-purple-600 border-purple-100';
              case 'REJECTED': return 'bg-rose-50 text-rose-600 border-rose-100';
              case 'SELECTED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
              default: return 'bg-slate-50 text-slate-600 border-slate-100';
            }
          };

          return (
            <div key={app.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              
              {/* Row Banner Block */}
              <div 
                onClick={() => setExpandedId(isOpen ? null : app.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shadow-3xs">
                    {app.company.slice(0,1)}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 transition-colors">{app.title}</h3>
                    <p className="text-[11px] text-slate-500 font-medium">{app.company} • {app.location} • <span className="text-slate-400 font-normal">{app.salary}</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                  <span className="text-[10px] font-mono bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md text-slate-500">
                    Logged {app.appliedDate}
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-wider border px-3 py-1 rounded-full ${getStatusStyles(app.status)}`}>
                    {app.status === 'REVIEWING' ? 'Under Review' : app.status}
                  </span>
                  <span className="text-xs text-slate-300 font-bold">{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>

              {/* Expanded Layout Block */}
              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/30 text-left space-y-6">
                  
                  {/* Onboarding Flow wrapper if SELECTED */}
                  {app.status === 'SELECTED' && (
                    <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-white border border-emerald-200/80 rounded-2xl p-6 space-y-5 transition-all shadow-xs">
                      <div className="flex items-start gap-3.5 border-b border-emerald-200/40 pb-4">
                        <span className="text-3xl p-2 bg-white border border-emerald-200 rounded-xl shadow-3xs">🎉</span>
                        <div>
                          <h4 className="text-base font-black text-emerald-900 tracking-tight">Selection Confirmation Matrix Verified!</h4>
                          <p className="text-xs text-slate-600 font-medium mt-0.5">Congratulations! {app.company} has signed your professional verification credentials.</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h5 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">📤 Required Verification Dossier Uploads</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {['Government ID Card', 'Academic Transcript', 'Signed Offer Acceptance'].map((docType) => {
                            const isUploaded = uploadedList.includes(docType);
                            return (
                              <div key={docType} className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col justify-between gap-3 shadow-3xs">
                                <p className="text-xs font-bold text-slate-900">{docType}</p>
                                <button type="button" onClick={() => handleDocUpload(app.id, docType)} className={`w-full py-2 rounded-lg text-[11px] font-bold tracking-wide transition-all ${isUploaded ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700'}`}>
                                  {isUploaded ? '✓ Asset Linked' : 'Upload Document'}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visual Timeline Rail */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">// PIPELINE MANAGEMENT TERMINAL PROGRESSION</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
                      {stages.map((stageName, idx) => {
                        const currentStatusIndex = stages.indexOf(app.status as any);
                        const isPastOrCurrent = idx <= (currentStatusIndex !== -1 ? currentStatusIndex : 0);
                        return (
                          <div key={idx} className={`p-3 border rounded-xl space-y-1 bg-white shadow-3xs transition-all relative ${app.status === stageName ? 'border-blue-400 ring-2 ring-blue-500/10' : isPastOrCurrent ? 'border-blue-100 bg-gradient-to-br from-white to-blue-50/10' : 'border-slate-200/60 opacity-60'}`}>
                            <div className="flex items-center justify-between">
                              <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${isPastOrCurrent ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>{stageName === 'REVIEWING' ? 'Under Review' : stageName}</span>
                              {isPastOrCurrent && <span className="text-xs text-blue-500">✔</span>}
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium leading-tight">
                              {stageName === 'APPLIED' && "Application profile logged successfully."}
                              {stageName === 'REVIEWING' && "Recruiter evaluation matrix active."}
                              {stageName === 'SHORTLISTED' && "Credentials matched to interview loops."}
                              {stageName === 'REJECTED' && "Pipeline archived from active search pools."}
                              {stageName === 'SELECTED' && "Offer parameters delivered successfully."}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* --- NEW ADDITION: CONTEXTUAL FOLLOW-UP EMAIL MATRIX ROW (Idea 1) --- */}
                  <div className="bg-slate-100/80 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">✉️</span>
                        <h4 className="text-[11px] font-mono font-bold tracking-wider text-slate-700 uppercase">Contextual Follow-Up Matrix Script</h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyToClipboard(`Subject: ${emailTemplate.subject}\n\n${emailTemplate.body}`)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] rounded-lg shadow-sm shadow-blue-100 transition-all"
                      >
                        Copy Clipboard Template
                      </button>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-3 font-mono text-[11px] text-slate-700 space-y-1 leading-relaxed shadow-3xs select-all">
                      <p className="font-bold text-blue-600 border-b border-slate-100 pb-1.5 mb-1.5">Subject: {emailTemplate.subject}</p>
                      <p className="whitespace-pre-line text-slate-600 font-medium">{emailTemplate.body}</p>
                    </div>
                  </div>

                  {/* Manual Controls Footer Panel */}
                  <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-xs font-semibold">
                    <span className="text-[10px] font-mono text-slate-400">// MANUALLY MANIPULATE WORKFLOW WORKSPACE</span>
                    <div className="flex gap-2">
                      <button onClick={(e) => { e.stopPropagation(); shiftStatus(app.id, 'LEFT'); }} className="px-4 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-[10px] font-bold shadow-3xs transition-all">◀ Demote Stage</button>
                      <button onClick={(e) => { e.stopPropagation(); shiftStatus(app.id, 'RIGHT'); }} className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-[10px] font-bold shadow-xs transition-all">Advance Stage ▶</button>
                    </div>
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};