import { Metadata } from 'next';
import { skillsData } from '@/data/skills';
import SkillBadge from '@/components/SkillBadge';
import styles from './skills.module.css';

export const metadata: Metadata = {
  title: 'Skills | Uday Kiran Tella',
  description: 'A breakdown of my technical skills including languages, frontend and backend frameworks, databases and tools.',
};

export default function Skills() {
  return (
    <div className="container">
      <section className={styles.skills}>
        <h1>My Skills</h1>
        <div className={styles.categories}>
          {skillsData.map((category) => (
            <div key={category.title} className={styles.category}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              <div className={styles.skillList}>
                {category.skills.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}