import React from 'react';
import Layout from '../components/layout';
import styled from 'styled-components';
import { graphql,Link } from 'gatsby';
import SpotifyAlbums from '../components/spotifyAlbums';
const IndexPage = ({data}) => (
  
  <Layout>

    <Content>
      <SpotifyAlbums></SpotifyAlbums>
      <Intro>
        <p>Welcome to my side of the internet. Here are a few quick <a href="#">links</a> to help you get around the site.</p>
        <p>I am an engineer, interested in how the world works and taking <a href="#">photos</a> along the way. I enjoy building, reading, running, and anything shiny that catches my eye.</p>
      </Intro>
      <Archives>
        <h3>Archives:</h3>
        <ul>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <ArchiveItem key={node.id} as="a" href={node.fields.slug}>
            <ArchiveContent>
              <ArchiveTitle>{node.frontmatter.title}</ArchiveTitle>
              <ArchiveTags>
                {node.frontmatter.tags.map((tag, index) => (
                  <ArchiveTag key={index}>{tag}</ArchiveTag>
                ))}
              </ArchiveTags>
            </ArchiveContent>
            <ArchiveDate>{node.frontmatter.date}</ArchiveDate>
          </ArchiveItem>
          ))}
        </ul>
      </Archives>
    </Content>
  </Layout>
);

const Content = styled.div`
  text-align: left;
  margin-left:60px;
`;

const Intro = styled.div`
  margin-bottom: 20px;
  a {
    color: #d8644c;
  }
`;

const Archives = styled.div`
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 10px;
    a {
      color: #d8644c;
      text-decoration: none;
      &:hover {
      border-radius:5px;
        text-decoration: underline;
        font-size:22px;/* Change this to the color you prefer */
  transition: font-size 0.5s ease; /* Optional: Smooth transition */

      }
      
    h3{
    font-weight: normal;}
`;
const ArchiveItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  border-radius: 0px;
  border-bottom: 1px solid white;
  text-decoration: none;
  color: inherit;
  transition: border-radius 0.5s ease, color 0.5s ease;
  cursor: pointer;

  &:hover {
    border-radius: 8px;
    color:#808080;
  }
`;

const ArchiveContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArchiveTitle = styled.h2`
  margin: 0;
  font-size: 1.25em;
`;

const ArchiveTags = styled.div`
  margin-top: 5px;
`;

const ArchiveTag = styled.span`
  display: inline-block;
  padding: 2px 5px;
  margin-right: 5px;
  border-radius: 4px;
  font-size: 0.85em;
  color:#d8644c;
`;

const ArchiveDate = styled.div`
  white-space: nowrap;
  color: #666;
  font-size: 0.85em;
`;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
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
