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
    <section className='section'>
      <div className='container'>
        <h2 className='title'>You searched for {searchTerm}</h2>
        <h3 className='subtitle'>There are {searchResults.totalResults} results on {searchResults.totalPages} pages</h3>
        <form>
          <select onChange={handlePageSize} className='select'>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </form>
        <div>
          <nav className='pagination is-right' role='navigation' aria-label='pagination'>
            <a
              className='pagination-next'
              onClick={handleNextPage}
            >+</a>

            <ul className='pagination-list'>
              <li>
                <a className='pagination-link'>Pg {pageNumber}</a>
              </li>

            </ul>

            {pageNumber > 1  ?
              <>
                <a
                  className='pagination-previous'
                  onClick={handlePreviousPage}
                >-</a>
              </>
              :
              <>
                <a
                  className='pagination-previous'
                  disabled
                >-</a>
              </>
            }

          </nav>
          <section>
            <div className='columns is-multiline'>
              {searchResults.results.map(result => {
                return <div key={result.id}> 
                  <Link 
                    to={`/object/${result.id}`}
                  >
                    <ObjectCard { ...result } size={1} />
                  </Link>

                </div>

              })}
            </div>

          </section>

        </div>
      </div>
    </section>
    
  )
}

export default InstitutionShowSearch
