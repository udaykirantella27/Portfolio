import styles from './SkillBadge.module.css';

interface SkillBadgeProps {
  name: string;
  level: string;
}

const SkillBadge = ({ name, level }: SkillBadgeProps) => {
  return (
    <div className={styles.badge}>
      <span className={styles.name}>{name}</span>
      <span className={styles.level} data-level={level}>{level}</span>
    </div>
  );
};

export default SkillBadge;