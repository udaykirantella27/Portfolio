export interface Experience { title: string; company: string; location: string; period: string; responsibilities: string[]; achievements: string[]; }
export interface Education { degree: string; institution: string; period: string; gpa: string; }
export interface Certification { name: string; issuer: string; }

export const experienceData: Experience[] = [
  { title: 'Associate Software Developer', company: 'Zihwa Insights', location: 'Bengaluru', period: 'Dec 2025 - Present', responsibilities: [
    'Build MERN applications and RESTful APIs for CRM and commerce workflows.',
    'Developed a modular CRM with JWT, RBAC, Supabase, lead tracking, and deal pipelines.',
    'Created reusable React components that improved delivery speed across product work.',
  ], achievements: ['Improved API response time by 20%', 'Increased component delivery productivity by 30%'] },
  { title: 'Front-end Developer', company: 'Ve-Lyra Labs', location: 'Bengaluru', period: 'May 2025 - Dec 2025', responsibilities: [
    'Built responsive React healthcare dashboards for doctors, patients, and administrators.',
    'Improved client performance with lazy loading, memoization, and code splitting.',
    'Shipped role-aware interfaces integrated with REST APIs.',
  ], achievements: ['Faster dashboard interactions', 'Reusable UI patterns across roles'] },
];

export const educationData: Education = { degree: 'B.Tech, Electronics and Communication Engineering', institution: 'Bapatla Engineering College', period: '2019 - 2023', gpa: '8.14 / 10.0' };
export const certificationsData: Certification[] = [
  { name: 'Full Stack Java Development', issuer: 'MERN & Java' }, { name: 'Advanced SQL', issuer: 'HackerRank' }, { name: 'Git and GitHub Bootcamp', issuer: "Let's Upgrade" }, { name: 'Java Programming', issuer: 'Brillant Institute' },
];
