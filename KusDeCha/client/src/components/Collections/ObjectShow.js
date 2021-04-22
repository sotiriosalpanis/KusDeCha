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
    <section className='section objects'>
      <div className='container'>
        <div className='box'>
          <div className='columns'>
            <div className='column is-8'>
              <h2 className='subtitle is-3'>{imageCatalogue.source.title}</h2>
            </div>
            <div className='column is-4'>
              <AddToScrapbook { ...imageCatalogue } />
            </div>
          </div>
          
        </div>

        <div className='box'>
          <OpenSeaDragonViewer iiifManifestURL={imageCatalogue.thumbnail.url}/>
        </div>
      
      </div>
    </section>
    
    
  )
}

export default ObjectShow
