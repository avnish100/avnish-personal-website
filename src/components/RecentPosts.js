import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PostListContainer = styled.div`
  margin-top: 2rem;
`;

const PostListTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text-color-secondary);
  margin-bottom: 1rem;
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PostItem = styled(motion.li)`
  margin-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const PostTitle = styled.h3`
  font-size: 1.4rem;
  color: var(--text-color-primary);
  margin-bottom: 0.5rem;
`;

const PostDate = styled.p`
  font-size: 0.9rem;
  color: var(--text-color-secondary);
  margin-bottom: 0.5rem;
`;

const PostExcerpt = styled.p`
  font-size: 1rem;
  color: var(--text-color-secondary);
  line-height: 1.5;
`;

const RecentPosts = ({ posts }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <PostListContainer>
      <PostListTitle>
        {posts.length} Post{posts.length !== 1 ? 's' : ''}
      </PostListTitle>
      <PostList
        as={motion.ul}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {posts.map(({ node }) => (
          <PostItem key={node.fields.slug} variants={itemVariants}>
            <PostLink to={node.fields.slug}>
              <PostTitle>{node.frontmatter.title}</PostTitle>
              <PostDate>{node.frontmatter.date}</PostDate>
              <PostExcerpt>{node.excerpt}</PostExcerpt>
            </PostLink>
          </PostItem>
        ))}
      </PostList>
    </PostListContainer>
  );
};

export default RecentPosts;