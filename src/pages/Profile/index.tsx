import React, { useState } from 'react';
import { useBoard } from '../../context/BoardContext';

interface CourseLink {
  id: string;
  title: string;
  provider: string;
  url: string;
  badgeColor: string;
  skillsAddressed: string[];
}

// External Learning Asset Directory
const RECOMMENDED_COURSES: CourseLink[] = [
  {
    id: 'course-1',
    title: 'Advanced Kubernetes Architecture & Orchestration',
    provider: 'CNCF / Coursera',
    url: 'https://www.coursera.org',
    badgeColor: 'bg-blue-50 text-blue-600 border-blue-100',
    skillsAddressed: ['Kubernetes', 'CI/CD Pipelines']
  },
  {
    id: 'course-2',
    title: 'Enterprise Production Systems Design and Metrics',
    provider: 'Educative.io',
    url: 'https://www.educative.io',
    badgeColor: 'bg-purple-50 text-purple-600 border-purple-100',
    skillsAddressed: ['System Design', 'Deployment Metrics']
  },
  {
    id: 'course-3',
    title: 'Testing Production React Applications at Scale',
    provider: 'Frontend Masters',
    url: 'https://frontendmasters.com',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-100',
    skillsAddressed: ['Unit Testing', 'React']
  }
];

export const ProfilePage: React.FC = () => {
  const { activeUser, updateActiveUser } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...activeUser });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');

  const handleSave = () => {
    updateActiveUser(formData);
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setUploadStatus('idle');
    }
  };

  const handleResumeSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!resumeFile) return;

    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
    }, 1500);
  };

  const handleRemoveResume = () => {
    if (window.confirm("Are you sure you want to delete and un-post this resume?")) {
      setResumeFile(null);
      setUploadStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-4 sm:p-8 max-w-6xl mx-auto space-y-6 font-sans">
      
      {/* Module Title Row */}
      <div className="text-left border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[10px] font-mono tracking-widest text-blue-600 font-bold uppercase">// CANDIDATE ENGAGEMENT LAYER</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Profile & Readiness Center</h1>
        </div>
        <div>
          {isEditing ? (
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(false)} className="px-4 py-1.5 bg-white hover:bg-slate-50 rounded-full text-xs font-bold border border-slate-200 text-slate-700 shadow-sm">Cancel</button>
              <button onClick={handleSave} className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-xs font-bold text-white shadow-md">Save Changes</button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="px-4 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold rounded-full text-slate-700 shadow-sm">Modify Parameters</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        
        {/* Left Sidebar: Identity Summary Field */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm h-fit">
          <h3 className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase pb-2 border-b border-slate-100">// Candidate Dossier</h3>
          
          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-bold uppercase block text-[9px]">Operator Signature</label>
              {isEditing ? <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none" /> : <p className="font-bold text-slate-900 text-sm">{activeUser.name}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-slate-400 font-bold uppercase block text-[9px]">Active Company Cluster</label>
              {isEditing ? <input type="text" value={formData.companyWorking} onChange={e => setFormData({...formData, companyWorking: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none" /> : <p className="font-bold text-indigo-600 bg-indigo-50/60 border border-indigo-100 px-2.5 py-1 rounded-lg w-fit mt-1">{activeUser.companyWorking}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-slate-400 font-bold uppercase block text-[9px]">Tracking Experience (YOE)</label>
              {isEditing ? <input type="number" value={formData.experienceYears} onChange={e => setFormData({...formData, experienceYears: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none" /> : <p className="font-bold text-slate-800">{activeUser.experienceYears} Years Tracked</p>}
            </div>
          </div>
        </div>

        {/* Right Section: Core Engagement Analytics & Dynamic Course Injection */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Dynamic Profile Readiness Metrics (image_e7edfc.png Alignment) */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-5 shadow-sm">
            <h3 className="text-[11px] font-mono font-bold tracking-widest text-indigo-600 uppercase pb-2 border-b border-slate-100">// Job Readiness Audit Feedback</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-xs font-medium">
              <div className="space-y-2">
                <div className="flex justify-between text-slate-600"><span>ATS Parseability Index</span><span className="font-bold text-slate-900">{activeUser.atsParseability}%</span></div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${activeUser.atsParseability}%` }} /></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-slate-600"><span>Target Keyword Density</span><span className="font-bold text-slate-900">{activeUser.keywordDensity}%</span></div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${activeUser.keywordDensity}%` }} /></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-slate-600"><span>Experience Matrix Depth</span><span className="font-bold text-slate-900">{activeUser.experienceDepth}%</span></div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${activeUser.experienceDepth}%` }} /></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-slate-600"><span>Quantified Impact Scalar</span><span className="font-bold text-slate-900">{activeUser.impactMetrics}%</span></div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-rose-500" style={{ width: `${activeUser.impactMetrics}%` }} /></div>
              </div>
            </div>
          </div>

          {/* Section 2: Suggestions To Improve Profile Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm border-l-4 border-l-emerald-500 space-y-2">
              <h4 className="text-[10px] font-mono font-bold tracking-widest text-emerald-600 uppercase border-b border-slate-100 pb-1 flex items-center gap-1.5">
                ✨ Profile Strengths
              </h4>
              <ul className="text-xs space-y-1.5 text-slate-600 font-medium leading-relaxed">
                <li>• Excellent technical depth in structural layout management frameworks.</li>
                <li>• Highly parseable taxonomy structure.</li>
              </ul>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm border-l-4 border-l-amber-500 space-y-2">
              <h4 className="text-[10px] font-mono font-bold tracking-widest text-amber-600 uppercase border-b border-slate-100 pb-1 flex items-center gap-1.5">
                ⚠️ Actionable Recommendations
              </h4>
              <ul className="text-xs space-y-1.5 text-slate-600 font-medium leading-relaxed">
                <li>• Add cloud infrastructure metrics to unlock higher-tier roles.</li>
                <li>• Increase coverage density of complex testing definitions.</li>
              </ul>
            </div>
          </div>

          {/* Section 3: LINKED RELEVANT LEARNING EXTERNAL PLATFORM ROUTES */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                📚 Aligned External Upskilling Curations
              </h3>
              <span className="text-[9px] bg-indigo-50 border border-indigo-100 text-indigo-600 px-2 py-0.5 rounded-md font-bold uppercase font-mono">Dynamic Alignment</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {RECOMMENDED_COURSES.map((course) => (
                <div key={course.id} className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:bg-slate-50">
                  <div className="space-y-1.5 text-left min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[9px] font-mono font-bold border px-2 py-0.5 rounded-md ${course.badgeColor}`}>
                        {course.provider}
                      </span>
                      <p className="text-xs font-extrabold text-slate-900 truncate">{course.title}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {course.skillsAddressed.map((skill, idx) => (
                        <span key={idx} className="text-[9px] bg-slate-100 border border-slate-200 px-1.5 py-0.2 rounded-sm text-slate-500 font-semibold">
                          Addresses: {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a 
                    href={course.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full sm:w-auto px-4 py-1.5 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-700 text-[11px] font-bold rounded-lg text-center shadow-3xs transition-all flex-shrink-0"
                  >
                    View Course ↗
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Interactive Resume Posting Hub */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 relative overflow-hidden shadow-sm">
              <h3 className="text-[11px] font-mono font-bold tracking-widest text-indigo-600 uppercase pb-2 border-b border-slate-100 mb-4">
                // Posted Profile Documents
              </h3>

              {!resumeFile || uploadStatus !== 'success' ? (
                <div className="border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 rounded-xl p-8 text-center relative transition-colors cursor-pointer group">
                  <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="space-y-2 text-xs text-slate-500">
                    <span className="text-2xl block group-hover:scale-110 transition-transform">📤</span>
                    <p className="font-bold text-slate-700">{resumeFile ? resumeFile.name : "Select or Drop your resume to post"}</p>
                    <p className="text-[10px] text-slate-400">Supports PDF, DOCX pipelines under 5MB</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl text-indigo-600 bg-white p-2 rounded-xl shadow-xs border border-indigo-100">📄</span>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate">{resumeFile.name}</p>
                      <p className="text-[10px] text-indigo-500 font-mono">Active Index Stream ID: BJ-{(resumeFile.size / 1024).toFixed(0)}-2026</p>
                    </div>
                  </div>
                  <button onClick={handleRemoveResume} className="px-3 py-1.5 border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 text-[10px] font-bold rounded-full transition-colors">Delete File</button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 px-1 pt-1">
              <button type="button" disabled={!resumeFile} onClick={() => setUploadStatus('idle')} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-full transition-all disabled:opacity-40 shadow-sm">
                Modify Posted Document
              </button>
              <button type="button" disabled={!resumeFile || uploadStatus === 'uploading'} onClick={() => handleResumeSubmit()} className="px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-xs font-bold rounded-full transition-all disabled:opacity-40 shadow-md">
                {uploadStatus === 'uploading' ? 'Analyzing Payload Stream...' : 'Update Asset Stream'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};