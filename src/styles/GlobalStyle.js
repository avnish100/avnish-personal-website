import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html {
    margin: 0;  
    background-color: black;
    font-family : Söhne, Inter, sans serif;
    color:white;
  }
`

export default GlobalStyle