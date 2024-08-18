import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const ImageGallery = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          extension: { regex: "/(jpg|jpeg|png)/" }
        }
      ) {
        edges {
          node {
            id
            name
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                
                
                transformOptions: { fit: CONTAIN }
              )
            }
          }
        }
      }
    }
  `);

  // Clone the array to avoid mutating the original array
  const allImages = Array.isArray(data.allFile.edges) ? data.allFile.edges : [];

  // Function to shuffle the array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffle and slice the first 6 images
  const shuffledImages = shuffleArray(allImages).slice(0, 4);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "30px",justifyContent:"center",marginTop:"20px" }}>
      {shuffledImages.length > 0 ? (
        shuffledImages.map(({ node: image }) => {
          const img = getImage(image.childImageSharp);
          return <GatsbyImage key={image.id} image={img} alt={image.name} width={250}/>;
        })
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
};

export default ImageGallery;
