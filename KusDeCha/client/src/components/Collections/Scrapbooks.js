import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreateScrapbook from './CreateScrapbook'
import ScrapbookImageCard from './ScrapbookImageCard'
import SearchBar from './SearchBar'

const Scrapbooks = () => {

  const [ scrapbooks, setScrapbooks ] = useState(null)

  useEffect(() =>{
    const getData = async() => {
      const { data } = await axios.get('api/scrapbooks/')
      setScrapbooks(data)
    }
    getData()
  },[])

  if (!scrapbooks) return null
  // console.log(scrapbooks[0].digital_images[0].id)

  return (
    <div>
      <SearchBar />
      <h3>Scrapbooks</h3>
      { scrapbooks.map(scrapbook => {
        return <Link key={scrapbook.id} to={`/scrapbooks/${scrapbook.id}`}>
          <div >
            <h4>{scrapbook.name}</h4>
            <p>Created by: {scrapbook.creator.username}</p>
            { scrapbook.digital_images.length > 0 ?
              <ScrapbookImageCard imageInfo={scrapbook.digital_images[0]}/>
              :
              <p>No images added yet...</p>
            }
            
          </div>
        </Link>
      })}
      <div>
        <CreateScrapbook />
      </div>
    </div>
  )
}

export default Scrapbooks
