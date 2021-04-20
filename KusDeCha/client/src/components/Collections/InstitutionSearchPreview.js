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

  console.log(searchResults)

  if (!searchResults) return null

  return (
    <div>
      <h4>Preview results for {searchTerm}</h4>
      {searchResults.results.map(result => {
        return <ObjectCard key={result.id} {...result} size={2} />
      })}
      <Link to={`/search#${searchTerm}`}>See full results for {searchTerm} here</Link>
    </div>
  )
}

export default InstitutionSearchPreview
