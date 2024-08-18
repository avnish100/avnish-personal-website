import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import TagPills from '../components/TagPills'
import PostList from '../components/RecentPosts'
import * as styles from './writing.module.css'
import RecentPosts from '../components/RecentPosts'

const WritingPage = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges
  const tags = data.allMarkdownRemark.group
  const [selectedTag, setSelectedTag] = React.useState(null)

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tag = params.get('tag')
    setSelectedTag(tag)
  }, [location.search])

  const filteredPosts = selectedTag
    ? posts.filter(({ node }) => node.frontmatter.tags.includes(selectedTag))
    : posts

  return (
    <Layout>
      <div className={styles.writingContainer}>
        <h1 className={styles.pageTitle}>Writing</h1>
        <TagPills tags={tags} selectedTag={selectedTag} />
        <RecentPosts posts={filteredPosts} />
      </div>
    </Layout>
  )
}

export default WritingPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
