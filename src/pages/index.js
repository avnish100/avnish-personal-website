import React from 'react';
import Layout from '../components/layout';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import { motion } from 'framer-motion';

const IndexPage = ({ data }) => {
  const recentPosts = data.allMarkdownRemark.edges.slice(0, 5);

  return (
    <Layout>
      <Container>
        <IntroText>
          <p>I'm Avnish Jha, a 22 year old engineer, currently working at Deloitte.</p>
          <p>
            Welcome to my side of the internet. Here are a few quick <Link to="#">links</Link> to help you get around the site.
          </p>
          <p>
            I am an engineer, interested in how the world works and taking <Link to="#">photos</Link> along the way. I enjoy building, reading, running and cars (thank you Top Gear) and anything shiny that catches my eye.
          </p>
        </IntroText>
        <ExperienceContainer>
          <ExperienceItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span style={{ color: 'var(--text-color-secondary)' }}>Deloitte</span>
            <span style={{ color: 'var(--text-color-secondary)' }}>2023-Present</span>
          </ExperienceItem>
          <ExperienceItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span style={{ color: 'var(--text-color-secondary)' }}>Zebra Technologies</span>
            <span style={{ color: 'var(--text-color-secondary)' }}>2023</span>
          </ExperienceItem>
        </ExperienceContainer>
        <RecentPostsContainer>
          <h2 style={{ color: 'var(--text-color-primary)' }}>Recent Blog Posts</h2>
          <PostList>
            {recentPosts.map(({ node }, index) => (
              <PostItem
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={node.fields.slug} style={{ textDecoration: 'none', display: 'block' }}>
                  <h3 style={{ color: 'var(--text-color-primary)' }}>{node.frontmatter.title}</h3>
                  <Excerpt>{node.excerpt}</Excerpt>
                  <MetaContainer>
                    {node.frontmatter.tags && (
                      <TagList>
                        {node.frontmatter.tags.map((tag, index) => (
                          <Tag key={index} style={{ color: 'var(--text-color-primary)' }}>
                            {tag}
                          </Tag>
                        ))}
                      </TagList>
                    )}
                    <Date>{node.frontmatter.date}</Date>
                  </MetaContainer>
                </Link>
              </PostItem>
            ))}
          </PostList>
        </RecentPostsContainer>
      </Container>
    </Layout>
  );
};

const IntroText = styled.div`
  text-align: left;
  margin-bottom: 40px;
  font-family: var(--secondary-font);
  color: var(--text-color-primary);
`;

const ExperienceContainer = styled.div`
  margin-top: 40px;
  text-align: left;
`;

const ExperienceItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  padding: 20px 0 20px 0;
  border-bottom: 1px solid var(--text-color-secondary);
  transition: transform 0.3s ease;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
`;

const RecentPostsContainer = styled.div`
  margin-top: 40px;
  text-align: left;
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PostItem = styled(motion.li)`
  padding: 20px 0;
  border-bottom: 1px solid var(--text-color-secondary);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const Excerpt = styled.p`
  color: var(--text-color-secondary);
  margin-bottom: 8px;
`;

const MetaContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 16px;
`;

const Tag = styled.span`
  background-color: var(--text-color-secondary);
  color: var(--text-color-primary);
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  font-size: 0.875rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--text-color-primary);
    color: var(--text-color-secondary);
  }
`;

const Date = styled.span`
  color: var(--text-color-secondary);
  font-size: 0.875rem;
`;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt(pruneLength: 150)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default IndexPage;