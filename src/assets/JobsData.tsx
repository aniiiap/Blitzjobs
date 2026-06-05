export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  tags: string[];
}

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Frontend Engineer (React)',
    company: 'TechCorp Solutions',
    location: 'Remote (US/Canada)',
    type: 'Remote',
    experience: 'Mid',
    salary: '$90,000 - $110,000',
    tags: ['React', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'CloudScale Inc',
    location: 'New York, NY',
    type: 'Full-time',
    experience: 'Senior',
    salary: '$130,000 - $160,000',
    tags: ['Node.js', 'React', 'PostgreSQL', 'AWS']
  },
  {
    id: '3',
    title: 'UI/UX Designer & Developer',
    company: 'CreativePulse Studio',
    location: 'London, UK',
    type: 'Contract',
    experience: 'Entry',
    salary: '£45,000 - £55,000',
    tags: ['Figma', 'React', 'CSS Motion']
  }
];