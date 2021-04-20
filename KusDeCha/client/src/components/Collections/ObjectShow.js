import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import AddToScrapbook from './AddToScrapbook'
import OpenSeaDragonViewer from './OpenSeaDragonViewer'


const ObjectShow = () => {


  const { id } = useParams()

  const [ imageCatalogue, setImageCatalogue ] = useState(null)

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`https://api.wellcomecollection.org/catalogue/v2/images/${id}`)
      setImageCatalogue(data)
    } 
    getData()
  },[])

  if (!imageCatalogue) return null


  return (
    <div>
      <h2>{imageCatalogue.source.title}</h2>
      <div>
        <AddToScrapbook { ...imageCatalogue } />
      </div>
      <div>
        <OpenSeaDragonViewer iiifManifestURL={imageCatalogue.thumbnail.url}/>
      </div>
      
    </div>
    
  )
}

export default ObjectShow
