// src/components/ProjectsComponent.js
import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { GitHub, ExternalLink } from 'react-feather';

// Assume these colors match your site's theme
const BACKGROUND_COLOR = '#f5f5f5';
const PRIMARY_COLOR = '#333333';
const SECONDARY_COLOR = '#666666';

const ProjectsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
 
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const ProjectCard = styled(motion.div)`
  border: 1px solid var(--text-color-secondary);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ProjectHeader = styled.div`
  
  color: --var(--text-color-primary);
  padding: 20px;
`;

const ProjectTitle = styled.h3`
  margin: 0;
  font-size: 20px;
`;

const ProjectDate = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  opacity: 0.8;
`;

const ProjectBody = styled.div`
  padding: 20px;
`;

const ProjectDescription = styled.p`
  margin: 0 0 20px;
  font-size: 16px;
  color: var(--text-color-secondary);
`;

const ProjectLinks = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  color: var(--text-color-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-color-primary);
  }

  svg {
    margin-right: 5px;
  }
`;

const ProjectsComponent = () => {
  const [projects, setProjects] = useState([]);
  const controls = useAnimation();

  const data = useStaticQuery(graphql`
    query {
      allProjectsJson {
        edges {
          node {
            title
            date
            repoUrl
            hostedUrl
          }
        }
      }
    }
  `);

  useEffect(() => {
    const fetchProjectsData = async () => {
      const projectsData = data.allProjectsJson.edges.map(({ node }) => node);
      const projectsWithDetails = await Promise.all(
        projectsData.map(async (project) => {
          try {
            const response = await fetch(`https://api.github.com/repos/${project.repoUrl.split('github.com/')[1]}`);
            const repoData = await response.json();
            return {
              ...project,
              description: repoData.description,
            };
          } catch (error) {
            console.error(`Error fetching data for ${project.title}:`, error);
            return project;
          }
        })
      );
      setProjects(projectsWithDetails.sort((a, b) => new Date(b.date) - new Date(a.date)));
      controls.start({ opacity: 1, y: 0 });
    };

    fetchProjectsData();
  }, [data, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <ProjectsWrapper>
      
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ delay: index * 0.1 }}
          >
            <ProjectHeader>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDate>{new Date(project.date).toLocaleDateString()}</ProjectDate>
            </ProjectHeader>
            <ProjectBody>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectLinks>
                <ProjectLink href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <GitHub size={16} /> GitHub
                </ProjectLink>
                {project.hostedUrl && (
                  <ProjectLink href={project.hostedUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} /> Live Demo
                  </ProjectLink>
                )}
              </ProjectLinks>
            </ProjectBody>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsWrapper>
  );
};

export default ProjectsComponent;