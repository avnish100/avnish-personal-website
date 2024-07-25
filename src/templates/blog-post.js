import React from "react";
import {graphql} from  'gatsby';
import Layout from '../components/layout';

const BlogPostTemplate = ({data}) =>{
    const post = data.markdownRemark;
    console.log(post);
    return (
        <Layout>
            <h1>{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
            <p>{post.frontmatter.tags.join(', ')}</p>
            <div dangerouslySetInnerHTML={{__html:post.html}}/>
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