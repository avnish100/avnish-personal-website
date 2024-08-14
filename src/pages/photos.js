import * as React from 'react'
import Layout from '../components/layout'
import PhotoGallery from "../components/PhotoGallery"

const PhotosPage = () => {
  return (
    <Layout pageTitle="Photos">
      <p>SOme text</p>
      <PhotoGallery/>
    </Layout>
  )
}

export const Head = () => <title>Photos</title>

export default PhotosPage