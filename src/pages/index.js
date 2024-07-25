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
            <li key={node.id}>
              <Link to={node.fields.slug}>
                {node.frontmatter.title} [{node.frontmatter.tags.join(', ')}]
              </Link>
            </li>
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

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
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
