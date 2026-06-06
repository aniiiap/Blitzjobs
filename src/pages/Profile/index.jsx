import React, { useState } from 'react';
import { useBoard } from '../../context/BoardContext';

const PROFILE_COMPLETION = 88;

const COMPLETED_ITEMS = [
  'Personal Information',
  'Work Experience',
  'Education',
  'Skills',
];

const MISSING_ITEMS = [
  { label: 'Portfolio Links', hint: 'Add 2 more projects' },
  { label: 'Certifications', hint: 'Add credentials' },
  { label: 'Professional Summary', hint: '' },
];

const SKILL_GROUPS = [
  {
    label: 'Design Tools',
    tone: 'bg-sky-50 text-sky-700 border-sky-100',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'Illustrator', 'Photoshop', 'InVision', 'Principle'],
  },
  {
    label: 'Technical Skills',
    tone: 'bg-violet-50 text-violet-700 border-violet-100',
    skills: ['HTML/CSS', 'React Basics', 'Design Systems', 'Responsive Design', 'Accessibility'],
  },
  {
    label: 'Research',
    tone: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    skills: ['User Interviews', 'Usability Testing', 'A/B Testing', 'Analytics', 'Survey Design'],
  },
  {
    label: 'Soft Skills',
    tone: 'bg-orange-50 text-orange-700 border-orange-100',
    skills: ['Leadership', 'Communication', 'Problem Solving', 'Collaboration', 'Mentoring'],
  },
];

const WORK_EXPERIENCE = [
  {
    id: 'exp-1',
    title: 'Senior Product Designer',
    company: 'TechCorp Inc.',
    period: 'Jan 2023 - Present',
    duration: '1 yr 5 mos',
    location: 'San Francisco, CA',
    bullets: [
      'Led design for core product features serving 500K+ users',
      'Established and maintained comprehensive design system',
      'Collaborated with engineering team on implementation',
    ],
    tags: ['Product Design', 'Design Systems', 'Figma', 'User Research'],
  },
  {
    id: 'exp-2',
    title: 'Product Designer',
    company: 'StartupXYZ',
    period: 'Mar 2021 - Dec 2022',
    duration: '1 yr 10 mos',
    location: 'Remote',
    bullets: [
      'Designed mobile and web applications from concept to launch',
      'Conducted user research and usability testing sessions',
      'Created wireframes, prototypes, and high-fidelity mockups',
    ],
    tags: ['UI/UX Design', 'Mobile Design', 'Prototyping', 'User Testing'],
  },
  {
    id: 'exp-3',
    title: 'Junior UI Designer',
    company: 'Creative Agency Co.',
    period: 'Jun 2019 - Feb 2021',
    duration: '1 yr 9 mos',
    location: 'New York, NY',
    bullets: [
      'Designed marketing websites and landing pages for clients',
      'Collaborated with developers on responsive implementations',
      'Maintained brand consistency across multiple projects',
    ],
    tags: ['Web Design', 'Branding', 'Adobe Creative Suite'],
  },
];

const EDUCATION = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Fine Arts in Graphic Design',
    school: 'Rhode Island School of Design',
    period: '2015 - 2019',
    location: 'Providence, RI',
    bullets: ['GPA: 3.8/4.0', "Dean's List (4 semesters)", 'Thesis: Digital Interface Design Patterns'],
  },
];

const CERTIFICATIONS = [
  {
    id: 'cert-1',
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google / Coursera',
    date: 'May 2023',
    url: 'https://www.coursera.org',
  },
  {
    id: 'cert-2',
    title: 'Figma Advanced Prototyping',
    issuer: 'Figma / Interaction Design Foundation',
    date: 'Aug 2022',
    url: 'https://www.figma.com',
  },
];

const PORTFOLIO = [
  { id: 'port-1', title: 'E-commerce Mobile App Redesign', platform: 'Behance', views: '2.3k views', url: 'https://www.behance.net' },
  { id: 'port-2', title: 'SaaS Dashboard Design System', platform: 'Dribbble', views: '1.8k views', url: 'https://dribbble.com' },
  { id: 'port-3', title: 'Healthcare App UX Case Study', platform: 'Medium', views: '950 views', url: 'https://medium.com' },
];

const IconUser = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconAward = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const IconBriefcase = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconGraduation = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const IconLink = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const IconPencil = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const IconTrash = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const IconShare = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const IconDownload = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const IconBuilding = () => (
  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const IconCamera = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SectionCard = ({ children, className = '' }) => (
  <div className={`bg-white border border-slate-200 rounded-2xl shadow-sm ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ icon, title, action }) => (
  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
    <div className="flex items-center gap-2.5">
      <span className="text-slate-500">{icon}</span>
      <h2 className="text-base font-bold text-slate-900">{title}</h2>
    </div>
    {action}
  </div>
);

const EditButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
    aria-label="Edit"
  >
    <IconPencil />
  </button>
);

const FieldInput = ({ label, value, onChange, readOnly, icon, type = 'text' }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-slate-700">{label}</label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full py-2.5 text-sm text-slate-900 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors ${icon ? 'pl-9 pr-3' : 'px-3'} ${readOnly ? 'bg-slate-50/50 cursor-default' : ''}`}
      />
    </div>
  </div>
);

export const ProfilePage = () => {
  const { activeUser, updateActiveUser } = useBoard();
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);

  const initials = activeUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const [personalInfo, setPersonalInfo] = useState({
    fullName: activeUser.name,
    email: activeUser.email,
    phone: activeUser.phoneNumber,
    location: 'San Francisco, CA',
    website: 'alexsmith.design',
    linkedin: 'linkedin.com/in/alexsmith',
    github: 'github.com/alexsmith',
    portfolio: 'alexsmith.design/portfolio',
  });

  const handleSavePersonal = () => {
    updateActiveUser({
      name: personalInfo.fullName,
      email: personalInfo.email,
      phoneNumber: personalInfo.phone,
    });
    setIsEditingPersonal(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">My Profile</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your personal information and career details</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <IconShare />
              Share
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <IconDownload />
              Resume
            </button>
          </div>
        </div>

        {/* Profile completion banner */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-6 sm:p-8 text-white shadow-lg shadow-indigo-200/40">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
            <div>
              <h2 className="text-lg font-bold">Profile Completion</h2>
              <p className="text-sm text-indigo-100 mt-0.5">Complete your profile to improve match scores</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{PROFILE_COMPLETION}%</div>
              <div className="text-sm text-indigo-100">Almost there!</div>
            </div>
          </div>

          <div className="w-full h-2.5 bg-white/25 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${PROFILE_COMPLETION}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-semibold text-indigo-100 mb-2.5">Completed</p>
              <ul className="space-y-1.5">
                {COMPLETED_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-emerald-300 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-indigo-100 mb-2.5">Missing</p>
              <ul className="space-y-1.5">
                {MISSING_ITEMS.map((item) => (
                  <li key={item.label} className="flex items-start gap-2">
                    <span className="text-indigo-200 mt-0.5">•</span>
                    <span>
                      {item.label}
                      {item.hint && <span className="text-indigo-200"> ({item.hint})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Personal info + Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SectionCard className="lg:col-span-2">
            <SectionHeader
              icon={<IconUser />}
              title="Personal Information"
              action={
                isEditingPersonal ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingPersonal(false)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSavePersonal}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <EditButton onClick={() => setIsEditingPersonal(true)} />
                )
              }
            />

            <div className="p-6 space-y-6">
              <div className="flex justify-center sm:justify-start">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    {initials}
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 border-2 border-white rounded-full flex items-center justify-center text-white shadow-sm hover:bg-indigo-700 transition-colors"
                    aria-label="Upload photo"
                  >
                    <IconCamera />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldInput
                  label="Full Name"
                  value={personalInfo.fullName}
                  readOnly={!isEditingPersonal}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                />
                <FieldInput
                  label="Email"
                  type="email"
                  value={personalInfo.email}
                  readOnly={!isEditingPersonal}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                />
                <FieldInput
                  label="Phone"
                  value={personalInfo.phone}
                  readOnly={!isEditingPersonal}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                />
                <FieldInput
                  label="Location"
                  value={personalInfo.location}
                  readOnly={!isEditingPersonal}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                />
                <FieldInput
                  label="Website"
                  value={personalInfo.website}
                  readOnly={!isEditingPersonal}
                  icon={<span className="text-xs">🌐</span>}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, website: e.target.value })}
                />
                <FieldInput
                  label="LinkedIn"
                  value={personalInfo.linkedin}
                  readOnly={!isEditingPersonal}
                  icon={<span className="text-xs font-bold text-blue-600">in</span>}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                />
                <FieldInput
                  label="GitHub"
                  value={personalInfo.github}
                  readOnly={!isEditingPersonal}
                  icon={<span className="text-xs">⌘</span>}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                />
                <FieldInput
                  label="Portfolio"
                  value={personalInfo.portfolio}
                  readOnly={!isEditingPersonal}
                  icon={<IconLink />}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, portfolio: e.target.value })}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard className="h-fit">
            <SectionHeader icon={<IconAward />} title="Skills" action={<EditButton onClick={() => {}} />} />
            <div className="p-6 space-y-5">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="text-sm font-semibold text-slate-700 mb-2.5">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border ${group.tone}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Work experience + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SectionCard className="lg:col-span-2">
            <SectionHeader
              icon={<IconBriefcase />}
              title="Work Experience"
              action={
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <span className="text-base leading-none">+</span>
                  Add Experience
                </button>
              }
            />
            <div className="divide-y divide-slate-100">
              {WORK_EXPERIENCE.map((exp) => (
                <div key={exp.id} className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                      <IconBuilding />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{exp.title}</h3>
                          <p className="text-sm text-slate-600 mt-0.5">{exp.company}</p>
                          <p className="text-xs text-slate-400 mt-1">
                            {exp.period} • {exp.duration} • {exp.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button type="button" className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50" aria-label="Edit experience">
                            <IconPencil className="w-3.5 h-3.5" />
                          </button>
                          <button type="button" className="p-1.5 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50" aria-label="Delete experience">
                            <IconTrash />
                          </button>
                        </div>
                      </div>
                      <ul className="mt-3 space-y-1 text-sm text-slate-600 list-disc list-inside">
                        {exp.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="space-y-6">
            <SectionCard>
              <SectionHeader icon={<IconAward />} title="Certifications" action={
                <button type="button" className="p-1 text-slate-400 hover:text-slate-600 text-lg leading-none" aria-label="Add certification">+</button>
              } />
              <div className="divide-y divide-slate-100">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.id} className="p-5">
                    <h4 className="text-sm font-bold text-slate-900">{cert.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{cert.issuer}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-400">{cert.date}</span>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        View Certificate
                        <IconLink />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard>
              <SectionHeader icon={<IconLink />} title="Portfolio" action={
                <button type="button" className="p-1 text-slate-400 hover:text-slate-600 text-lg leading-none" aria-label="Add portfolio item">+</button>
              } />
              <div className="p-4 space-y-3">
                {PORTFOLIO.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 p-3 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{item.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.platform} • {item.views}</p>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex-shrink-0"
                    >
                      View
                      <IconLink />
                    </a>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Education */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SectionCard className="lg:col-span-2">
            <SectionHeader
              icon={<IconGraduation />}
              title="Education"
              action={
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <span className="text-base leading-none">+</span>
                  Add Education
                </button>
              }
            />
            <div className="divide-y divide-slate-100">
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0 text-violet-500">
                      <IconGraduation />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{edu.degree}</h3>
                          <p className="text-sm text-slate-600 mt-0.5">{edu.school}</p>
                          <p className="text-xs text-slate-400 mt-1">
                            {edu.period} • {edu.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button type="button" className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50" aria-label="Edit education">
                            <IconPencil className="w-3.5 h-3.5" />
                          </button>
                          <button type="button" className="p-1.5 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50" aria-label="Delete education">
                            <IconTrash />
                          </button>
                        </div>
                      </div>
                      <ul className="mt-3 space-y-1 text-sm text-slate-600 list-disc list-inside">
                        {edu.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

      </div>
    </div>
  );
};
