import React from 'react';
import { Link } from 'gatsby';
import "../styles/variables.css";
import GlobalStyle from '../styles/GlobalStyle';

import styled from 'styled-components';
const Layout = ({ children }) => (
  <div id="root">
  <GlobalStyle/>
  <Container>
    <Header>
      <nav>
      <NavLink to="/">Avnish Jha</NavLink>
        <NavLink to="/writing">Writing</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/photos">Photos</NavLink>
      </nav>
    </Header>
    <Main>{children}</Main>
    <Footer>
      <p>Avnish Jha | v2024.1</p>
    </Footer>
  </Container>
  </div>
);

const Container = styled.div`
  
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
    max-width: 80vw;
    
  
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
      color:grey;

`;

const NavLink = styled(Link)`
  margin: 0 10px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
        color:grey;

`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 800px;
  padding: 20px;
`;

const Footer = styled.footer`
  padding: 10px;
  text-align: center;
`;

export default Layout;
