import React from 'react'
import { Link } from 'gatsby'
import * as styles from './TagPills.module.css'

const TagPills = ({ tags, selectedTag }) => (
  <div className={styles.tagPillsContainer}>
    {tags.map(tag => (
      <Link
        key={tag.fieldValue}
        to={`/writing?tag=${encodeURIComponent(tag.fieldValue)}`}
        className={`${styles.tagPill} ${selectedTag === tag.fieldValue ? styles.selectedTag : ''}`}
      >
        {tag.fieldValue} ({tag.totalCount})
      </Link>
    ))}
  </div>
)

export default TagPills