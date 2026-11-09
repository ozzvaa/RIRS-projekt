import type { CSSProperties } from 'react'
import styles from './ProjectCompletion.module.css'

function ProjectCompletion({ value, position }: { value: number; position: 'card' | 'detail' }) {
  const percentage = Math.max(0, Math.min(100, value))
  const style = { '--completion-hue': percentage * 1.2 } as CSSProperties

  return (
    <span className={`${styles.badge} ${styles[position]}`} style={style} aria-label={`Izpolnjenost ${percentage}%`}>
      {percentage}%
    </span>
  )
}

export default ProjectCompletion
