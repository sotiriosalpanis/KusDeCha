import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import InstitutionSearchPreview from './InstitutionSearchPreview'
import ScrapbookImageCard from './ScrapbookImageCard'

const ScrapbookShow = () => {

  const [ scrapbook, setScrapbook ] = useState({
    name: '',
    creator: {},
    digital_images: [],
  })

  const [ searchTerm, setSearchTerm ] = useState(null)
  const [ search, setSearch ] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`/api/scrapbooks/${id}/`)
      setScrapbook(data)
    }
    getData()
  },[])

  const handleChange = event => {
    setSearchTerm(event.target.value)
    if (!event.target.value) setSearch(false)
  }



  useEffect(() => {
    setSearch(searchTerm)
  },[searchTerm])


  if (!scrapbook) return null

  

  return (
    <div>
      <h2>{scrapbook.name}</h2>
      <h3>by {scrapbook.creator.username}</h3>
      {scrapbook.digital_images.length > 0 ?
        scrapbook.digital_images.map(image => {
          return <div key={image.id}> 
            <h4 >{image.catalogue_title}</h4>
            <ScrapbookImageCard  imageInfo={image} />
          </div>

        })
        :
        <p>No images</p>
      }
      <div>
        <form>
          <input 
            value={searchTerm}
            onChange={handleChange}
          />
          <button type='submit'>Search</button>
        </form>
        { search ?
          <InstitutionSearchPreview searchTerm={search}/>
          :
          <p></p>
        }
        

        
      </div>
      
    </div>
  )
}

export default ScrapbookShow
