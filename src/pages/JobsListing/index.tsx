import React, { useState, useMemo } from 'react';
import { useBoard } from '../../context/BoardContext';

interface JobPosition {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  experienceRequired: number;
  salary: string;
  skills: string[];
  match: number;
}

const MASTER_JOBS_DATABASE: JobPosition[] = [
  { id: 'job-1', title: 'Senior Product Engineer', company: 'Vercel', location: 'Remote', category: 'Engineering', experienceRequired: 4, salary: '₹38-50 LPA', skills: ['React', 'TypeScript', 'Edge'], match: 98 },
  { id: 'job-2', title: 'Frontend Architect', company: 'Stripe', location: 'Bengaluru', category: 'Design', experienceRequired: 5, salary: '₹48-62 LPA', skills: ['React', 'Design Systems'], match: 84 },
  { id: 'job-3', title: 'Full-Stack Engineer', company: 'Linear', location: 'Remote', category: 'Engineering', experienceRequired: 3, salary: '₹42-55 LPA', skills: ['Node', 'Postgres', 'GraphQL'], match: 91 },
  { id: 'job-4', title: 'Platform Engineer', company: 'Figma', location: 'Hyderabad', category: 'Product', experienceRequired: 3, salary: '₹35-48 LPA', skills: ['Go', 'Kubernetes'], match: 76 },
  { id: 'job-5', title: 'Cloud Infrastructure Architect', company: 'Supabase', location: 'Remote', category: 'Engineering', experienceRequired: 5, salary: '₹50-70 LPA', skills: ['AWS', 'Terraform', 'Postgres', 'Docker'], match: 94 },
  { id: 'job-6', title: 'DevSecOps Automation Specialist', company: 'Auth0', location: 'Bengaluru', category: 'Engineering', experienceRequired: 4, salary: '₹40-55 LPA', skills: ['OAuth2', 'CI/CD Pipelines', 'Vault', 'K8s'], match: 89 },
  { id: 'job-7', title: 'Compiler & Runtime Engineer', company: 'CoreOS Labs', location: 'Hyderabad', category: 'Engineering', experienceRequired: 4, salary: '₹45-60 LPA', skills: ['LLVM', 'Rust', 'C++', 'IR Arrays'], match: 95 },
  { id: 'job-8', title: 'Site Reliability Engineer (SRE)', company: 'Datadog', location: 'Chennai', category: 'Engineering', experienceRequired: 3, salary: '₹36-48 LPA', skills: ['Linux Kernel', 'Prometheus', 'Go', 'eBPF'], match: 82 },
  { id: 'job-9', title: 'Backend Systems Developer', company: 'Redis Labs', location: 'Bengaluru', category: 'Engineering', experienceRequired: 3, salary: '₹38-52 LPA', skills: ['C', 'Redis', 'Data Structures', 'TCP/IP'], match: 90 },
  { id: 'job-10', title: 'Distributed Systems Architect', company: 'CockroachLabs', location: 'Remote', category: 'Engineering', experienceRequired: 6, salary: '₹60-85 LPA', skills: ['Go', 'Raft Consensus', 'SQL Engines', 'gRPC'], match: 97 },
  { id: 'job-11', title: 'AI Infrastructure Engineer', company: 'HuggingFace', location: 'Remote', category: 'Product', experienceRequired: 4, salary: '₹55-75 LPA', skills: ['Python', 'PyTorch', 'CUDA', 'Triton'], match: 86 },
  { id: 'job-12', title: 'Staff UI Engineer', company: 'Framer', location: 'Bengaluru', category: 'Design', experienceRequired: 5, salary: '₹45-58 LPA', skills: ['WebGL', 'React', 'Tailwind', 'Framer Motion'], match: 81 },
  { id: 'job-13', title: 'Machine Learning Pipelines Engineer', company: 'Scale AI', location: 'Hyderabad', category: 'Data', experienceRequired: 3, salary: '₹40-55 LPA', skills: ['Python', 'Kubeflow', 'Airflow', 'Data Lakes'], match: 88 },
  { id: 'job-14', title: 'Data Platform Core Architect', company: 'Snowflake', location: 'Chennai', category: 'Data', experienceRequired: 6, salary: '₹55-80 LPA', skills: ['Java', 'C++', 'Query Optimization', 'Cloud Storage'], match: 93 },
  { id: 'job-15', title: 'Security Operations & Penetration Tester', company: 'CrowdStrike', location: 'Bengaluru', category: 'Engineering', experienceRequired: 4, salary: '₹42-56 LPA', skills: ['Network Forensics', 'Python', 'Reverse Engineering'], match: 85 },
  { id: 'job-16', title: 'Embedded Firmware Developer', company: 'Tesla Energy', location: 'Remote', category: 'Engineering', experienceRequired: 5, salary: '₹48-65 LPA', skills: ['Embedded C', 'RTOS', 'CAN Bus', 'Microcontrollers'], match: 79 },
  { id: 'job-17', title: 'Mobile Core Engineering Specialist', company: 'WhatsApp', location: 'Hyderabad', category: 'Product', experienceRequired: 4, salary: '₹50-68 LPA', skills: ['Swift', 'Kotlin', 'C++', 'SQLite Protocols'], match: 92 },
  { id: 'job-18', title: 'Blockchain Protocol Engineer', company: 'Solana Labs', location: 'Remote', category: 'Engineering', experienceRequired: 3, salary: '₹52-70 LPA', skills: ['Rust', 'Web3', 'Cryptography', 'eBPF Runtimes'], match: 75 },
  { id: 'job-19', title: 'GraphQL API Gateways Architect', company: 'Apollo GraphQL', location: 'Chennai', category: 'Engineering', experienceRequired: 4, salary: '₹38-50 LPA', skills: ['Node', 'TypeScript', 'GraphQL Federation', 'Wasm'], match: 87 },
  { id: 'job-20', title: 'Senior Observability Engineer', company: 'Grafana Labs', location: 'Remote', category: 'Product', experienceRequired: 5, salary: '₹46-62 LPA', skills: ['Go', 'OpenTelemetry', 'Prometheus', 'React'], match: 94 }
];

export const JobsListingPage: React.FC = () => {
  const { addApplication, activeUser } = useBoard();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLocFilter, setActiveLocFilter] = useState<string | null>(null);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);

  const filteredJobs = useMemo(() => {
    return MASTER_JOBS_DATABASE.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesLoc = !activeLocFilter || job.location === activeLocFilter || (activeLocFilter === 'Remote' && job.location === 'Remote');
      return matchesSearch && matchesLoc;
    });
  }, [searchQuery, activeLocFilter]);

  const handleApply = (job: JobPosition, e: React.MouseEvent) => {
    e.stopPropagation();
    addApplication(job.title, job.company, job.location, job.salary, job.match);
    setAppliedIds(prev => [...prev, job.id]);
    alert(`Application successfully registered for ${job.title} at ${job.company}.`);
  };

  const calculatedChances = useMemo(() => {
    if (!selectedJob) return { total: 0, resumeFit: 0, experienceFit: 0, interviewChance: 0 };
    
    const baseScore = activeUser.resumeScore;
    const expDelta = Number(activeUser.experienceYears) >= selectedJob.experienceRequired ? 100 : 70;
    
    return {
      total: Math.round((selectedJob.match + baseScore) / 2),
      resumeFit: Math.round((activeUser.atsParseability + selectedJob.match) / 2),
      experienceFit: expDelta,
      interviewChance: Math.round((activeUser.impactMetrics + selectedJob.match) / 2)
    };
  }, [selectedJob, activeUser]);

  // --- DYNAMIC GAP ANALYSIS DETECTOR (Idea 1 Logic Hub) ---
  const skillGapAnalysis = useMemo(() => {
    if (!selectedJob) return { coreOverlap: [], adjacentSkills: [], missingSlots: [] };

    // Simulating user core skillset matrix
    const userSkills = ['React', 'TypeScript', 'Node', 'Python', 'C++', 'Data Structures', 'SQL'];

    const coreOverlap = selectedJob.skills.filter(s => userSkills.includes(s));
    const missingSlots = selectedJob.skills.filter(s => !userSkills.includes(s));
    
    // Simulating systemic adjacent suggestions (e.g., matching AWS with a Docker background)
    const adjacentSkills = missingSlots.length > 0 ? [missingSlots[0]] : [];
    const remainingMissing = missingSlots.filter(s => !adjacentSkills.includes(s));

    return {
      coreOverlap,
      adjacentSkills: missingSlots.length > 0 ? adjacentSkills : [],
      missingSlots: remainingMissing
    };
  }, [selectedJob]);

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 sm:p-8 max-w-7xl mx-auto space-y-6 font-sans relative">
      
      <div className="text-left border-b border-gray-200 pb-5 space-y-1">
        <div className="text-[10px] font-mono tracking-widest text-blue-600 font-bold uppercase">// DISCOVER</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Optimal Matches</h1>
        <p className="text-xs text-gray-500">Click a card row to evaluate comprehensive resume matching analysis constraints.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar Filters */}
        <div className="md:col-span-3 space-y-4 bg-gray-50 border border-gray-200 rounded-2xl p-5 text-left shadow-2xs">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase block">Location Hub</span>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black">
                <input type="checkbox" checked={activeLocFilter === 'Remote'} onChange={() => setActiveLocFilter(activeLocFilter === 'Remote' ? null : 'Remote')} className="accent-blue-600" />
                Remote Operations
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black">
                <input type="checkbox" checked={activeLocFilter === 'Bengaluru'} onChange={() => setActiveLocFilter(activeLocFilter === 'Bengaluru' ? null : 'Bengaluru')} className="accent-blue-600" />
                Bengaluru Hub
              </label>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200 space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase block">Experience Range</span>
            <div className="space-y-2 text-xs text-gray-400 font-medium">
              <label className="flex items-center gap-2"><input type="checkbox" disabled className="accent-blue-600" /> 0-2 Years</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-purple-600" /> 3-5 Years (Active)</label>
            </div>
          </div>
        </div>

        {/* Right Content Area - Job Listings Matrix */}
        <div className="md:col-span-9 space-y-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search role, company, or core skill stack..."
            className="w-full text-xs px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 text-left shadow-2xs"
          />

          <div className="space-y-3">
            {filteredJobs.map((job) => {
              const hasApplied = appliedIds.includes(job.id);
              const isCurrentSelection = selectedJob?.id === job.id;
              
              return (
                <div 
                  key={job.id} 
                  onClick={() => setSelectedJob(job)}
                  className={`border rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left transition-all relative overflow-hidden group cursor-pointer ${
                    isCurrentSelection 
                      ? 'border-blue-400 bg-blue-50/20 ring-2 ring-blue-500/10 shadow-sm' 
                      : 'bg-white border-gray-200 hover:border-blue-200 hover:shadow-sm'
                  }`}
                >
                  <div className="space-y-2 min-w-0 flex-grow">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 text-blue-600 font-black text-xs flex items-center justify-center shadow-3xs">
                        {job.company.slice(0,1)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                        <p className="text-[11px] text-gray-500 font-medium">{job.company} • {job.location} • {job.salary}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.skills.map((s, idx) => (
                        <span key={idx} className="text-[9px] font-mono font-bold bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-md">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center flex-shrink-0">
                    <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md shadow-3xs">
                      {job.match}% Match
                    </span>
                    <button
                      disabled={hasApplied}
                      onClick={(e) => handleApply(job, e)}
                      className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-wide transition-all ${
                        hasApplied 
                          ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed' 
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-100'
                      }`}
                    >
                      {hasApplied ? 'Applied' : 'Apply Now'}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* --- SIDE CONTEXTUAL DRAWER (Probability + Skill Gap Panel Layers) --- */}
      {selectedJob && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white border-l border-gray-200 shadow-2xl z-50 p-6 flex flex-col justify-between text-left transition-transform transform duration-300 animate-in slide-in-from-right overflow-y-auto">
          
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Predictive Analysis</span>
                <h4 className="text-sm font-black text-gray-900 mt-1.5">{selectedJob.title}</h4>
                <p className="text-[11px] text-gray-400 font-medium">Hiring probability logic index for you</p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-gray-300 hover:text-gray-600 text-lg font-bold p-1">✕</button>
            </div>

            {/* Total Aggregate Score Ring Banner */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl p-5 space-y-3 shadow-md">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-wider font-bold uppercase opacity-80">Aggregate Hiring Chance</span>
                <span className="text-2xl font-black">{calculatedChances.total}%</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${calculatedChances.total}%` }} />
              </div>
            </div>

            {/* Granular Variable Sliders */}
            <div className="space-y-3.5 text-xs font-semibold border-b border-gray-100 pb-5">
              <div className="space-y-1">
                <div className="flex justify-between text-gray-600"><span>Resume Parsing Fit</span><span className="text-gray-900 font-bold">{calculatedChances.resumeFit}%</span></div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${calculatedChances.resumeFit}%` }} /></div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-gray-600"><span>Chronological Experience Layer</span><span className="text-gray-900 font-bold">{calculatedChances.experienceFit}%</span></div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${calculatedChances.experienceFit}%` }} /></div>
              </div>
            </div>

            {/* --- NEW SKILL GAP DIAGNOSTIC MAP FEATURE LAYER (Idea 1) --- */}
            <div className="space-y-4">
              <h5 className="text-[10px] font-mono tracking-wider font-bold text-gray-400 uppercase">// Blueprint Stack Alignment Map</h5>
              
              <div className="space-y-3 text-xs">
                {/* 1. Core Match Pills */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1"><span>✔</span> Verified Assets Overlap</p>
                  <div className="flex flex-wrap gap-1">
                    {skillGapAnalysis.coreOverlap.length === 0 ? (
                      <span className="text-[10px] text-gray-400 font-medium italic">No exact matches found.</span>
                    ) : (
                      skillGapAnalysis.coreOverlap.map((s, i) => (
                        <span key={i} className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-md shadow-3xs">{s}</span>
                      ))
                    )}
                  </div>
                </div>

                {/* 2. Adjacent Vector Pills */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-amber-600 flex items-center gap-1"><span>✦</span> Adjacent Skill Vectors</p>
                  <div className="flex flex-wrap gap-1">
                    {skillGapAnalysis.adjacentSkills.length === 0 ? (
                      <span className="text-[10px] text-gray-400 font-medium italic">No critical adjacencies mapped.</span>
                    ) : (
                      skillGapAnalysis.adjacentSkills.map((s, i) => (
                        <span key={i} className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-md shadow-3xs">{s}</span>
                      ))
                    )}
                  </div>
                </div>

                {/* 3. Empty Dashed Missing Asset Slots */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1"><span>⤜</span> Structural Gaps Uncovered</p>
                  <div className="flex flex-wrap gap-1">
                    {skillGapAnalysis.missingSlots.length === 0 ? (
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">100% Stack Synergy Complete</span>
                    ) : (
                      skillGapAnalysis.missingSlots.map((s, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold text-slate-400 border border-dashed border-slate-300 bg-slate-50 px-2.5 py-0.5 rounded-md">{s}</span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Control Actions */}
          <div className="border-t border-gray-100 pt-4 flex gap-2 mt-6">
            <button onClick={() => setSelectedJob(null)} className="w-1/3 py-2.5 border border-gray-200 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-50">Close</button>
            <button 
              disabled={appliedIds.includes(selectedJob.id)}
              onClick={(e) => { if(selectedJob) handleApply(selectedJob, e); }}
              className="w-2/3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-md disabled:opacity-40"
            >
              {appliedIds.includes(selectedJob.id) ? 'Applied Successfully' : 'Apply Instantly'}
            </button>
          </div>

        </div>
      )}

    </div>
  );
};