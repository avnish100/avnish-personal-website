import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import WritingLayout from '../components/WritingLayout';
import styled from 'styled-components';

const PostList = styled.div`
  margin-bottom: 20px;
`;

const PostItem = styled.div`
  margin-bottom: 20px;
  padding: 20px;
 
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  a {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
  }

  p {
    margin: 0;
  }
`;

const WritingPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <WritingLayout posts={posts}>
        <h1>Writing</h1>
        <PostList>
          {posts.map(({ node }) => (
            <PostItem key={node.frontmatter.slug}>
              <a href={node.fields.slug}>
                <p>{node.frontmatter.title}</p>
                <p>{node.frontmatter.date}</p>
                
              </a>
            </PostItem>
          ))}
        </PostList>
      </WritingLayout>
    </Layout>
  );
};

export const query = graphql`
  query WritingPageQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            
          }
          fields{
          slug}
          
        }
      }
    }
  }
`;

export default WritingPage;
