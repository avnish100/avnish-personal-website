import React from 'react';
import Layout from '../components/layout';
import styled from 'styled-components';
import { graphql,Link } from 'gatsby';
const WritingPage = ({data}) => (
  <Layout>
    <b style={{fontSize:'18px'}}>Recent Posts</b>
    <Archives>
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
  </Layout>
);


const ArchiveItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  border-radius: 0px;
  border-bottom: 1px solid white;
  text-decoration: none;
  color: #808080;
    transition: color 0.5s, width;

  cursor: pointer;

  &:hover {
    width:750px;
    color:white;
  }
`;

const ArchiveContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArchiveTitle = styled.h2`
  margin: 0;
  font-size: 1em;
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



export default WritingPage;

