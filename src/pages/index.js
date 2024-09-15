import React from 'react';
import Layout from '../components/layout';
import styled from 'styled-components';
import { graphql, Link} from 'gatsby';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github} from 'lucide-react';
import { ExternalLink } from 'react-feather';

const IndexPage = ({ data }) => {
  const recentPosts = data.allMarkdownRemark.edges.slice(0, 5);
  const selectedWorks = [
    { title: 'WebRTC Chat Application', description: 'Simple Chat application that lets you enter a room and chat with participants', technologies: ['NextJS', 'WebRTC', 'PostgreSQL'] },
    { title: 'cmsync', description: 'Automation Script to sync local images folder and your CMS', technologies: ['python', 'CMS', 'Sanity'] },
  ];

  return (
    <Layout>
      <Container>
        <IntroText>
          <h1>Hey there, I am Avnish Jha</h1>
          <p>
           I am a Software Dev with experience working at Zebra Technlogies and Deloitte. I am interested in everying digital and learning how the world we see today through our screens work. I am skilled in web technologies and take pride in making performant and beautiful websites.
           My world revolves around tech, startups and the product space. I love taking <StyledLink to="photos" target="photos" rel="noopener noreferrer">photos <ExternalLink size={16}></ExternalLink></StyledLink> as well and <StyledLink to="https://thedelhiwalla.com" target="_blank" rel="noopener noreferrer">TheDelhiwalla <ExternalLink size={16}></ExternalLink></StyledLink> is an immense inspiration. 
           </p><p>I love to discuss ideas
           new ideas and learn new things and <StyledLink to="writing" target="writing" rel="noopener noreferrer">write <ExternalLink size={16}></ExternalLink></StyledLink> along the way. This site serves as a personal repository to share everything i am currently building, learning or seeing
           so feel free to explore and reach out if you wanna collaborate, chat about the next big idea or discuss why V10s should make a come-back to F1.
          </p>
          
        </IntroText>
        <SocialLinks>
          <SocialLink href="https://twitter.com/avnisharyanjha" target="_blank" rel="noopener noreferrer">
            <Twitter size={24} />
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/avnish-jha-875ba120b/" target="_blank" rel="noopener noreferrer">
            <Linkedin size={24} />
          </SocialLink>
          <SocialLink href="https://github.com/avnish100" target="_blank" rel="noopener noreferrer">
            <Github></Github>
          </SocialLink>
        </SocialLinks>

        <CTAButton>Let's Collaborate</CTAButton>
        <ExperienceContainer>
          <ExperienceItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span style={{ color: 'var(--text-color-secondary)' }}>Deloitte</span>
            <span style={{ color: 'var(--text-color-secondary)' }}>2023-Present</span>
          </ExperienceItem>
          <ExperienceItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span style={{ color: 'var(--text-color-secondary)' }}>Zebra Technologies</span>
            <span style={{ color: 'var(--text-color-secondary)' }}>2023</span>
          </ExperienceItem>
        </ExperienceContainer>
        
        <RecentPostsContainer>
          <h2 style={{ color: 'var(--text-color-primary)' }}>Recent Blog Posts</h2>
          <div>Here you can find a few of my recent posts</div>
          <PostList>
            {recentPosts.map(({ node }, index) => (
              <PostItem
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={node.fields.slug} style={{ textDecoration: 'none', display: 'block' }}>
                  <h3 style={{ color: 'var(--text-color-primary)' }}>{node.frontmatter.title}</h3>
                  <Excerpt>{node.excerpt}</Excerpt>
                  <MetaContainer>
                    {node.frontmatter.tags && (
                      <TagList>
                        {node.frontmatter.tags.map((tag, index) => (
                          <Tag key={index} style={{ color: 'var(--text-color-primary)' }}>
                            {tag}
                          </Tag>
                        ))}
                      </TagList>
                    )}
                    <Date>{node.frontmatter.date}</Date>
                  </MetaContainer>
                </Link>
              </PostItem>
            ))}
          </PostList>
        </RecentPostsContainer>
        <SelectedWorkContainer>
          <h2 style={{ color: 'var(--text-color-primary)' }}>Selected Work</h2>
          <WorkList>
            {selectedWorks.map((work, index) => (
              <WorkItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <WorkContent>
                  <WorkTitle>{work.title}</WorkTitle>
                  <WorkDescription>{work.description}</WorkDescription>
                  <TechList>
                    {work.technologies.map((tech, techIndex) => (
                      <TechItem key={techIndex}>{tech}</TechItem>
                    ))}
                  </TechList>
                </WorkContent>
              </WorkItem>
            ))}
          </WorkList>
        </SelectedWorkContainer>
      </Container>
    </Layout>
  );
};
const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SocialLink = styled.a`
  color: var(--text-color-primary);
  margin: 0 10px;
  transition: color 0.3s ease;

  &:hover {
    color: var(--highlight-color);
  }
`;

const CTAButton = styled.button`
  display: block;
  margin: 0 auto 40px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: var(--background-color);
  background-color: var(--text-color-primary);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: var(--highlight-color);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
const IntroText = styled.div`
  text-align: left;
  margin-bottom: 40px;
  font-family: var(--secondary-font);
  color: var(--text-color-primary);
`;

const ExperienceContainer = styled.div`
  margin-top: 40px;
  text-align: left;
`;

const ExperienceItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  padding: 20px 0 20px 0;
  border-bottom: 1px solid var(--text-color-secondary);
  transition: transform 0.3s ease;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
`;

const RecentPostsContainer = styled.div`
  margin-top: 40px;
  text-align: left;
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PostItem = styled(motion.li)`
  padding: 20px 0;
  border-bottom: 1px solid var(--text-color-secondary);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const Excerpt = styled.p`
  color: var(--text-color-secondary);
  margin-bottom: 8px;
`;

const MetaContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 16px;
`;

const Tag = styled.span`
  background-color: var(--text-color-secondary);
  color: var(--text-color-primary);
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  font-size: 0.875rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--text-color-primary);
    color: var(--text-color-secondary);
  }
`;

const Date = styled.span`
  color: var(--text-color-secondary);
  font-size: 0.875rem;
`;

const StyledLink = styled(Link)`
  align-items: center;
  color: var(--text-color-secondary);
  text-decoration: none;

  transition: color 0.3s ease;

  &:hover {
    color: var(--text-color-primary);
  }

  svg {
    margin-right: 5px;
  }
`;

const SelectedWorkContainer = styled.div`
  margin-top: 60px;
  text-align: left;

  h2 {
    margin-bottom: 30px;
    font-size: 2rem;
    color: var(--text-color-primary);
  }
`;

const WorkList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const WorkItem = styled(motion.li)`
  background-color: var(--background-color);
  border: 1px solid var(--text-color-secondary);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const WorkContent = styled.div`
  padding: 20px;
`;

const WorkTitle = styled.h3`
  color: var(--text-color-primary);
  font-size: 1.4rem;
  margin-bottom: 10px;
`;

const WorkDescription = styled.p`
  color: var(--text-color-secondary);
  font-size: 1rem;
  margin-bottom: 15px;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TechItem = styled.span`
  background-color: var(--text-color-secondary);
  color: var(--background-color);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: var(--text-color-primary);
    color: var(--background-color);
  }
`;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt(pruneLength: 150)
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