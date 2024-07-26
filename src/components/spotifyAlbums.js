import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const SpotifyAlbums = () => {
  const data = useStaticQuery(graphql`
    query {
      allSpotifyAlbum {
        nodes {
          id
          album
          artist
          image
          link
        }
      }
    }
  `);

  return (
    <div>
      <h4 style={{textAlign:'left'}}>Music</h4>
    <Gallery>
      
      {data.allSpotifyAlbum.nodes.map(album => (
        <Album key={album.id}>
          <a href={album.link} target="_blank" rel="noopener noreferrer">
            <img src={album.image} alt={album.album} />
          </a>
          
        </Album>
      ))}
    </Gallery>
    </div>

  );
};

const Gallery = styled.div`
   display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1rem 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
`;

const Album = styled.div`
  width: 100%;
  padding-bottom: 100%; // To maintain aspect ratio
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
  
`;

export default SpotifyAlbums;
