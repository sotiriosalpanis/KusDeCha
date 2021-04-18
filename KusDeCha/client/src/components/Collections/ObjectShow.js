// import React, { useState, useEffect } from 'react'
import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import AddToScrapbook from './AddToScrapbook'
import OpenSeaDragonViewer from './OpenSeaDragonViewer'


const ObjectShow = () => {


  const { id } = useParams()
  const { hash } = useLocation()
  console.log(hash)
  const apiRoot = 'https://iiif.wellcomecollection.org/image'

  const manifestURL = `${apiRoot}/${id}/info.json`


  console.log(manifestURL)

  return (
    <div>
      <h2>Object Show Page</h2>
      <AddToScrapbook />
      <div>
        <OpenSeaDragonViewer iiifManifestURL={manifestURL}/>
      </div>
      
    </div>
    
  )
}

export default ObjectShow
