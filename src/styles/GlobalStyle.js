import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html {
    margin: 0;  
    background-color: var(--background-color);
    color:var(--text-color-primary);
    font-family: 'Switzer-Regular', 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

export default GlobalStyle