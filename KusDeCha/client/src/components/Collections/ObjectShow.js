// import React, { useState, useEffect } from 'react'
import React from 'react'
import { useParams } from 'react-router-dom'
import OpenSeaDragonViewer from './OpenSeaDragonViewer'


const ObjectShow = () => {

  const { id } = useParams()
  const apiRoot = 'https://iiif.wellcomecollection.org/image'

  const manifestURL = `${apiRoot}/${id}/info.json`



  return (
    <div>
      <h2>Object Show Page</h2>
      <div>
        <OpenSeaDragonViewer iiifManifestURL={manifestURL}/>
      </div>
      
    </div>
    
  )
}

export default ObjectShow
