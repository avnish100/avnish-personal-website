import React from 'react';
import Layout from '../components/layout';
import styled from 'styled-components';
import { graphql,Link } from 'gatsby';
import SpotifyAlbums from '../components/spotifyAlbums';
import ImageGallery from '../components/ImageGallery';

const images = [
  { src: 'https://images.pexels.com/photos/27439406/pexels-photo-27439406/free-photo-of-a-cup-of-coffee-sits-on-a-bed-with-pillows.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Image 1' },
  { src: 'https://images.pexels.com/photos/27439406/pexels-photo-27439406/free-photo-of-a-cup-of-coffee-sits-on-a-bed-with-pillows.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Image 2' },
  { src: 'https://images.pexels.com/photos/27439406/pexels-photo-27439406/free-photo-of-a-cup-of-coffee-sits-on-a-bed-with-pillows.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Image 3' },
  { src: 'https://images.pexels.com/photos/27439406/pexels-photo-27439406/free-photo-of-a-cup-of-coffee-sits-on-a-bed-with-pillows.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Image 4' },
  { src: 'https://images.pexels.com/photos/27439406/pexels-photo-27439406/free-photo-of-a-cup-of-coffee-sits-on-a-bed-with-pillows.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Image 5' },
  { src: 'https://images.pexels.com/photos/27439406/pexels-photo-27439406/free-photo-of-a-cup-of-coffee-sits-on-a-bed-with-pillows.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Image 6' },
];
const IndexPage = ({data}) => (
  
  <Layout>
<Container>
<IntroText>
        <p>I'm Avnish Jha, a 22 year old engineer, currently working at Deloitte.</p>
        <p>
          Welcome to my side of the internet. Here are a few quick <Link to="#">links</Link> to help you get around the site. </p><p>I am an engineer, interested in how the world works and taking <Link to="#">photos</Link> along the way. I enjoy building, reading, running and cars (thank you Top Gear) and anything shiny that catches my eye.
        </p>
      </IntroText>
      <ExperienceContainer>
        <ExperienceItem>
          <span>Deloitte</span>
          <span>2023-Present</span>
        </ExperienceItem>
        <ExperienceItem>
          <span>Some personal project</span>
          <span>2023</span>
        </ExperienceItem>
        <ExperienceItem>
          <span>Another personal project</span>
          <span>2023</span>
        </ExperienceItem>
      </ExperienceContainer>
      <ImageGallery images={images} />
    </Container>
  </Layout>
);

const IntroText = styled.div`
  text-align: left;
  margin-bottom: 40px;
  font-family: var(--secondary-font);
`;

const ExperienceContainer = styled.div`
  margin-top: 40px;
  text-align: left;
`;

const ExperienceItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0 20px 0;
  border-bottom: 1px solid var(--text-color-secondary);
  
  transition: transform 0.3s ease;
  
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
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
