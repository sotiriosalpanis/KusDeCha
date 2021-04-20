import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import ObjectCard from './ObjectCard'

const InstitutionShowSearch = ( ) => {
  
  const { hash } = useLocation()
  const searchTerm = hash.replace('#','')
  const apiRoot = 'https://api.wellcomecollection.org/catalogue/v2/'

  const [ searchResults, setSearchResults ] = useState(null)
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ pageSize, setPageSize ] = useState(50)

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`${apiRoot}images?pageSize=${pageSize}&page=${pageNumber}&query=${searchTerm}`)
      setSearchResults(data)
    }
    getData()
  },[pageNumber, pageSize])

  const handlePageSize = event => {
    setPageSize(event.target.value)
  }

  const handleNextPage = () => {
    const nextPage = pageNumber + 1
    setPageNumber(nextPage)
  }
  const handlePreviousPage = () => {
    const nextPage = pageNumber - 1
    setPageNumber(nextPage)
  }


  if (!searchResults) return null


  return (

    <div>
      <h2>You searched for {searchTerm}</h2>
      <h3>There are {searchResults.totalResults} results on {searchResults.totalPages} pages</h3>
      <form>
        <select onChange={handlePageSize}>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </select>
      </form>
      <div>
        <button
          onClick={handleNextPage}
        >+</button>
        <p>{pageNumber} of {searchResults.totalPages}</p>
        {pageNumber > 1  ?
          <button
            onClick={handlePreviousPage}
          >-</button>
          :
          <p></p>
        }
        <section>
          {searchResults.results.map(result => {
            return <Link key={result.id}
              to={`/object/${result.id}`}
            >
              <ObjectCard { ...result } />
            </Link>
          })}
        </section>

      </div>
    </div>
  )
}

export default InstitutionShowSearch
