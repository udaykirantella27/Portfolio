export interface Skill {
  name: string;
  level: 'Core' | 'Advanced' | 'Working knowledge';
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    title: 'Front-End',
    description: 'Interfaces, component systems, and performance-aware delivery.',
    skills: [
      { name: 'HTML5', level: 'Core' }, { name: 'CSS3', level: 'Core' },
      { name: 'JavaScript ES6+', level: 'Core' }, { name: 'TypeScript', level: 'Advanced' },
      { name: 'React.js', level: 'Core' }, { name: 'Next.js', level: 'Advanced' },
      { name: 'Tailwind', level: 'Advanced' }, { name: 'React Hooks', level: 'Core' },
    ],
  },
  {
    title: 'Back-End',
    description: 'Secure services, structured APIs, and application logic.',
    skills: [
      { name: 'Node.js', level: 'Core' }, { name: 'Express.js', level: 'Core' },
      { name: 'REST APIs', level: 'Core' }, { name: 'JWT', level: 'Advanced' },
      { name: 'OAuth 2.0', level: 'Working knowledge' }, { name: 'RBAC', level: 'Advanced' },
      { name: 'MVC', level: 'Advanced' }, { name: 'Java', level: 'Advanced' },
    ],
  },
  {
    title: 'Databases',
    description: 'Data layers selected for product fit and long-term clarity.',
    skills: [
      { name: 'MongoDB', level: 'Core' }, { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'MySQL', level: 'Advanced' }, { name: 'Supabase', level: 'Advanced' },
    ],
  },
  {
    title: 'Tools',
    description: 'A practical delivery toolchain for production work.',
    skills: [
      { name: 'Git', level: 'Core' }, { name: 'GitHub', level: 'Advanced' },
      { name: 'Docker', level: 'Working knowledge' }, { name: 'CI/CD', level: 'Advanced' },
      { name: 'Cloudflare', level: 'Working knowledge' }, { name: 'Vercel', level: 'Advanced' },
      { name: 'Netlify', level: 'Advanced' },
    ],
  },
];
