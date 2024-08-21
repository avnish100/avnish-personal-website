import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const GalleryWrapper = styled.div`
  color: #fff;
  padding: 20px;
`;

const YearSection = styled(motion.div)`
  margin-bottom: 40px;
`;

const YearTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
  color: var(--text-color-primary);
`;

const ImageGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const ImageItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  &:nth-child(3n+1) {
    grid-column: span 2;
    grid-row: span 2;
  }
`;

const ImageCaption = styled.div`
  padding: 8px 0;
  font-size: 12px;
  color: var(--text-color-secondary);
`;

const PhotoGallery = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const controls = useAnimation();

  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: { sourceInstanceName: { eq: "images" } }
        sort: { fields: name, order: ASC }
      ) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('#photo-gallery');
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.8 && !shouldAnimate) {
        setShouldAnimate(true);
        controls.start({ opacity: 1, y: 0 });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls, shouldAnimate]);

  // Assume image names are in format: YYYY-MM-DD_Caption.jpg
  const images = data.allFile.edges.map(({ node }) => {
    const [date, ...captionParts] = node.name.split('_');
    const [year, month, day] = date.split('-');
    return {
      year,
      date: `${month}.${day}.${year}`,
      caption: captionParts.join(' ').replace('.jpg', ''),
      image: getImage(node),
    };
  });

  // Group images by year
  const groupedImages = images.reduce((acc, img) => {
    (acc[img.year] = acc[img.year] || []).push(img);
    return acc;
  }, {});

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <GalleryWrapper id="photo-gallery">
      {Object.entries(groupedImages).map(([year, yearImages], index) => (
        <YearSection
          key={year}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          variants={sectionVariants}
          transition={{ delay: index * 0.2 }}
        >
          <YearTitle>{year}</YearTitle>
          <ImageGrid
            initial="hidden"
            animate={shouldAnimate ? 'visible' : 'hidden'}
            variants={sectionVariants}
            transition={{ delay: index * 0.2 }}
          >
            {yearImages.map((img, index) => (
              <ImageItem
                key={index}
                initial="hidden"
                animate={shouldAnimate ? 'visible' : 'hidden'}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <GatsbyImage image={img.image} alt={img.caption} />
                <ImageCaption>{img.caption} — {img.date}</ImageCaption>
              </ImageItem>
            ))}
          </ImageGrid>
        </YearSection>
      ))}
    </GalleryWrapper>
  );
};

export default PhotoGallery;