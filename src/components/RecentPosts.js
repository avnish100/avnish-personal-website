import React from 'react'
import { Link } from 'gatsby'
import * as styles from './recentposts.module.css'

const RecentPosts = ({ posts }) => (
    <div className={styles.postListContainer}>
    <h2 className={styles.postListTitle}>
      {posts.length} Post{posts.length !== 1 ? 's' : ''}
    </h2>
    <ul className={styles.postList}>
      {posts.map(({ node }) => (
        <li key={node.fields.slug} className={styles.postItem}>
          <Link to={node.fields.slug} className={styles.postLink}>
            <h3 className={styles.postTitle}>{node.frontmatter.title}</h3>
            <p className={styles.postDate}>{node.frontmatter.date}</p>
            <p className={styles.postExcerpt}>{node.excerpt}</p>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default RecentPosts