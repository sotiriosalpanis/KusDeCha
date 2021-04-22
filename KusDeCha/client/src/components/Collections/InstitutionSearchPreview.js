import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ObjectCard from './ObjectCard'
import { Link } from 'react-router-dom'

const InstitutionSearchPreview = ( { searchTerm }) => {


  const apiRoot = 'https://api.wellcomecollection.org/catalogue/v2/'
  const [ searchResults, setSearchResults ] = useState(null)

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`${apiRoot}images?pageSize=5&page=1&query=${searchTerm}`)
      setSearchResults(data)
    }
    getData()
  },[searchTerm])

  if (!searchResults) return null

  return (
    <div className='box search-preview'>
      <h4 className='subtitle is-3'>Preview results for {searchTerm}</h4>
      <div className='columns is-multiline'>
        {searchResults.results.map(result => {
          return <div className='column' key={result.id}> 
            <ObjectCard  {...result} size={2} />
          </div>
        })}
        
      </div>
      <Link to={`/search#${searchTerm}`}>See full results here</Link>
    </div>
  )
}

export default InstitutionSearchPreview
