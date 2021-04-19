import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreateScrapbook from './CreateScrapbook'

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

  return (
    <div>
      <h3>Scrapbooks</h3>
      { scrapbooks.map(scrapbook => {
        return <Link key={scrapbook.id} to={`/scrapbooks/${scrapbook.id}`}>
          <div >
            <h4>{scrapbook.name}</h4>
            <p>Created by: {scrapbook.creator.username}</p>
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
