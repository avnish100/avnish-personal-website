import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const MainContent = styled.div`
  flex: 3;
  padding-right: 20px;
`;

const Sidebar = styled.div`
  flex: 1;
  padding-left: 20px;
  background: rgba(142, 160, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
`;

const PostLink = styled.div`
  margin-bottom: 10px;
  a {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
    &:hover {
      color: var(--highlight-color);
    }
  }
`;

const WritingLayout = ({ children, posts }) => {
  return (
    <Container>
      <MainContent>{children}</MainContent>
      <Sidebar>
        <h3>Other Writings</h3>
        {posts.map(post => (
          <PostLink key={post.node.frontmatter.slug}>
            <a href={`/writing/${post.node.frontmatter.slug}`}>
              {post.node.frontmatter.title}
            </a>
          </PostLink>
        ))}
      </Sidebar>
    </Container>
  );
};

export default WritingLayout;
