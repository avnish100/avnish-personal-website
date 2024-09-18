import * as React from 'react'
import Layout from '../components/layout'
import PhotoGallery from "../components/PhotoGallery"
import styled from 'styled-components'

const PhotosPage = () => {
  return (
    <Layout pageTitle="Photos">
      <Para>I like to take pictures in my free time. <a href="http://www.thedelhiwalla.com/" style={{textDecoration:"none",color:"var(--text-color-secondary)",hover:{color:"var(--text-color-primary)"}}}>The Delhiwalla</a> 
      is a huge inspiration to for capturing the daily experience. Here are some of my favourite pictures i have </Para>
      <PhotoGallery/>
    </Layout>
  )
}

const Para = styled.p`
  padding: 20px;
  text-align: center;

  @media(max-width:768px){
    padding:0;
  }
`

export const Head = () => <title>Photos</title>

export default PhotosPage