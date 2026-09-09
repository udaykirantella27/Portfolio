import Link from 'next/link';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  techStack: string[];
}

const ProjectCard = ({ id, title, description, techStack }: ProjectCardProps) => {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>
        <Link href={`/projects/${id}`}>{title}</Link>
      </h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.techStack}>
        {techStack.map((tech) => (
          <span key={tech} className={styles.tech}>
            {tech}
          </span>
        ))}
      </div>
      <Link href={`/projects/${id}`} className={styles.link}>
        View Details →
      </Link>
    </article>
  );
};

export default ProjectCard;