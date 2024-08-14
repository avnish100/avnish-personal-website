import React from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  margin-top:20px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`;

const ImageItem = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

const ImageGallery = ({ images }) => (
  <GalleryContainer>
    {images.map((image, index) => (
      <ImageItem key={index} src={image.src} alt={image.alt}/>
    ))}
  </GalleryContainer>
);

export default ImageGallery;
