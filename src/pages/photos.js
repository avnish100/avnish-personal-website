import * as React from 'react'
import Layout from '../components/layout'
import PhotoGallery from "../components/PhotoGallery"

const PhotosPage = () => {
  return (
    <Layout pageTitle="Photos">
      <p style={{padding:"20px",textAlign:"center"}}>I like to take pictures in my free time. <a href="http://www.thedelhiwalla.com/" style={{textDecoration:"none",color:"var(--text-color-secondary)",hover:{color:"var(--text-color-primary)"}}}>The Delhiwalla</a> 
      is a huge inspiration to for capturing the daily experience. Here are some of my favourite pictures i have </p>
      <PhotoGallery/>
    </Layout>
  )
}

export const Head = () => <title>Photos</title>

export default PhotosPage