import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image";

const PhotoGallery = () =>{
    const data = useStaticQuery(graphql`
        query{
        allFile(filter : {sourceInstanceName: { eq: "images" }, extension: { regex: "/(jpg|jpeg|png)/" } }){
        edges{
            node{
            id
            name
            childImageSharp{
                gatsbyImageData(layout: CONSTRAINED  transformOptions:{fit:CONTAIN})}}
            }}
        }`);

        const photos = [
            {
                name: "image1",
                location: "Paris, France",
                date: "2024-08-10",
              },
              {
                name: "image2",
                location: "New York, USA",
                date: "2024-07-15",
              },
        ];
       
        return (
            <div style = {{display:"flex",flexWrap:"wrap", width:"100vw",marginLeft:"-100%",justifyContent:"center"}}>
                {data.allFile.edges.map(({ node }) => {
        const imageData = getImage(node);
        const photo = photos.find((p) => p.name === node.name);
        return (
          <div key={node.id} style={{ margin: "10px"}}>
            <GatsbyImage image={imageData} alt={node.name}/>
            {photo && (
              <div>
                <p>{photo.location}</p>
                <p>{photo.date}</p>
              </div>
            )}
          </div>
        );
      })}
            </div>
        )
};

export default PhotoGallery;