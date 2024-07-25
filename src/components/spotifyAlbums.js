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
      <h4 style={{textAlign:'left',marginLeft:'0px'}}>Music</h4>
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Album = styled.div`
  margin: 5px;
  text-align: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
`;

export default SpotifyAlbums;
