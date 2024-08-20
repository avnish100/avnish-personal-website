const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');
const {getRecentlyPlayed} = require('./src/utils/spotify');

exports.onCreateNode = ({
    node,actions,getNode
})=>{
    const {createNodeField} = actions;
    if(node.internal.type === 'MarkdownRemark'){
        const slug = createFilePath({
            node,getNode,basePath:'content/blog'
        });
        createNodeField({
            node,
            name: 'slug',
            value: slug,
          });
    }
}

exports.createPages = async ({graphql,actions}) =>{
    const {createPage} = actions;
    const result = await graphql(
        `
        query {
        allMarkdownRemark{
        edges{
        node{
        fields{
        slug}
        frontmatter{
        title}}}}}
        `
    );
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/blog-post.js'),
          context: {
            slug: node.fields.slug,
          },
        });
      });
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  const albums = await getRecentlyPlayed();

  albums.forEach(album => {
    const nodeContent = JSON.stringify(album);
    const nodeMeta = {
      id: createNodeId(`spotify-album-${album.album}`),
      parent: null,
      children: [],
      internal: {
        type: 'SpotifyAlbum',
        mediaType: 'text/html',
        content: nodeContent,
        contentDigest: createContentDigest(album),
      },
    };

    const node = Object.assign({}, album, nodeMeta);
    createNode(node);
  });
};



exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: `/writing${slug}`,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges
  const tagTemplate = path.resolve('src/templates/tag.js')

  // Create individual post pages
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('src/templates/blog-post.js'),
      context: {
        slug: node.fields.slug,
      },
    })
  })

  // Create tag pages
  let tags = []
  posts.forEach(edge => {
    if (edge.node.frontmatter.tags) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })
  tags = [...new Set(tags)]

  tags.forEach(tag => {
    createPage({
      path: `/tags/${tag}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })
}

