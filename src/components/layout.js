import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@reach/router';
import styled from 'styled-components';
import './layout.module.css'; // Assuming you have a root CSS file for global styles
import GlobalStyle from '../styles/GlobalStyle.js'
import ArrowIcon from './ArrowIcon.js';
import { StaticImage } from 'gatsby-plugin-image';
import '../styles/variables.css'
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 20px 0 20px;
  min-height:100vh;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  transform: rotate(-10deg);
  margin-bottom: 20px;
`;

const NavLinks = styled.nav`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  background: var(--background-navbar);
  position: sticky;
  top: ${props => (props.isHomePage ? '0' : '0px')};
  left: ${props => (props.isHomePage ? '0' : '10px')};
  width:100vw;
  justify-content: ${props => (props.isHomePage ? 'center' : 'center')};
  margin-left: calc(50% - 50vw);
  
  --translate-distance: 10px;

`;

const NavLink = styled(Link)`
 margin: 0 15px;
  text-decoration: none;
  color: var(--text-color-secondary);
  font-weight: bold;
  position: relative;
  display: inline-block;
  padding: 10px;

  &::after {
    content: '';
    display: block;
    position: absolute;
    right: -25px; /* Adjust spacing from the text */
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: rgba(142, 160, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    color: var(--highlight-color);
    
  }

  &:hover::after {
    opacity: 1;
  }
  &::activeFirst{
    display:none;
  }

  svg {
    position: absolute;
    right: -25px; /* Adjust spacing from the text */
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover svg
 {
    opacity: 1;
  }

   
  
`;

const Content = styled.div`
  text-align: left;
  margin-top: 40px;
  min-height: calc(100vh - 233px);
`;
const FooterContainer = styled.footer`

  color: #fff;
  text-align: center;
  width: 100%;
  position: static;
  bottom: 0;
  left: 0;
  padding: 10px 0;
  height: 60px; /* Make sure this matches the LayoutContainer's padding-bottom */
  
 
`

const FooterContent = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  
`

const FooterLink = styled.a`
  color: var(--text-color-secondary);
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #ffcc00; /* Add a hover color effect if you like */
  }
`

const FooterText = styled.p`
  font-size: 0.875rem;
    color: var(--text-color-secondary);

`


const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // const data = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         profileImage
  //       }
  //     }
  //   }
  // `);

  // const profileImage = data.site.siteMetadata.profileImage;

  return (
    <div>
      <GlobalStyle/>
    <Container>
      {isHomePage && <StaticImage
      src="https://pbs.twimg.com/profile_images/1822997090118623233/AG-a48wO_400x400.jpg"
      alt="A dinosaur"
      placeholder="blurred"
      layout="fixed"
      width = {150}
      height={150}
      objectFit="cover"
      style = {{marginLeft:"350px"}}
      imgStyle={{borderRadius: "50%",
        objectFit: "cover",
      
        marginBottom: "20px"}}
      
    />}
      <NavLinks isHomePage={isHomePage}>
      <NavLink to="/" activeClassName="activeFirst" className='nav-link'>Home<ArrowIcon/></NavLink>
        <NavLink to="/writing" activeClassName="active" className='nav-link'>Writing <ArrowIcon/></NavLink>
        <NavLink to="/projects" activeClassName="active" className="nav-link">Projects<ArrowIcon/></NavLink>
        <NavLink to="/photos" activeClassName="active" className="nav-link">Photos<ArrowIcon/></NavLink>
      </NavLinks>
      <Content>
        {children}
      </Content>
      <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink
            href="https://twitter.com/avnisharyanjha"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </FooterLink>
          <FooterLink
            href="https://www.linkedin.com/in/avnish-jha-875ba120b/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </FooterLink>
          <FooterLink
            href="https://github.com/avnish100"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </FooterLink>
          
        </FooterLinks>
        <FooterText>
         v{new Date().getFullYear()}.2     Avnish Jha.
        </FooterText>
      </FooterContent></FooterContainer>
    </Container>
    </div>

  );
};

export default Layout;
