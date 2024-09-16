import React from "react";
import {graphql} from  'gatsby';
import Layout from '../components/layout';
import styled from 'styled-components';

const Date = styled.p`
  font-family: var(--mono-font);
`;

const TagContainer = styled.div`
display:flex;`

const Tag = styled.div`
padding:2px; 
border-radius:2px;
color: var(--tag-text);
background: var(--tag-background);
margin:5px;
  font-family: var(--mono-font);
`;

const Content = styled.div`
img{
display:block;
margin : 0 auto;
}
a{
text-decoration:underline;
color:var(--text-color-secondary);
}

`
const BlogPostTemplate = ({data}) =>{
    const post = data.markdownRemark;
    console.log(post);
    return (
        <Layout>
           <Date>{post.frontmatter.date}</Date>
            <h1>{post.frontmatter.title}</h1>
            <TagContainer>
           {post.frontmatter.tags.map((tag)=>{
            return(
            <Tag>{tag}</Tag>)
           }
            )}
            </TagContainer>
            <Content dangerouslySetInnerHTML={{ __html: post.html }} />
        </Layout>
    )
}




export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`;

export default BlogPostTemplate;