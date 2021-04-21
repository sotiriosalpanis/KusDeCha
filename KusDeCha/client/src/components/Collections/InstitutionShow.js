import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


import ObjectCard from './ObjectCard'

const InstitutionShow = ( ) => {


  const apiRoot = 'https://api.wellcomecollection.org/catalogue/v2/'

  const [ institution, setInstitution ] = useState(null)

  const [ pageNumber, setPageNumber ] = useState(1)
  const [ pageSize, setPageSize ] = useState(50)

  const [searchTerm, setSearchTerm ] = useState('')
  const [searchSet, setSearchSet ] = useState(null)

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`${apiRoot}images?pageSize=${pageSize}&page=${pageNumber}`)
      setInstitution(data)
    }
    getData()
  },[pageNumber, pageSize])

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`${apiRoot}images?pageSize=${pageSize}&page=${pageNumber}&query=${searchTerm}`)
      setSearchSet(data)
    }
    getData()
  },[searchTerm, pageNumber, pageSize])

  const handleChange = event => {
    try {
      setSearchTerm(event.target.value)
    } catch (err) {
      console.log(err)
    }
  }

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

  if (!institution) return null

  
  return (
    <div className='section'>
      <div className='container'>
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
      
        <div className='box'>
          <h2>Explore the Wellcome Collections Digitised Content</h2>
          {!searchTerm ? <p>Browse {institution.totalResults} images</p>
            : <p>&apos;{searchTerm}&apos; returned {searchSet.totalResults}</p>
          }
          <form className='columns is-8'>
            <div className='control column'>
              <input
                className='input'
                onChange={handleChange}
                value={searchTerm}
                placeholder='Search'
              />
            </div>
            <div className='control column is-2 is-offset-2'>
              <select onChange={handlePageSize} className='select'>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </select>
            </div>
          </form>


        </div>
        <div>

          <div className='columns is-multiline'>
            {!searchTerm ? institution.results.map(result => {
              return <Link key={result.id}
                to={ `/object/${result.id}`}
              >
                <ObjectCard  { ...result } size={1}/>
              </Link>
            
            })
              :
              searchSet.results.map(result => {
                return <ObjectCard key={result.id} { ...result } size={1} />
              })
            }
          </div>
        </div>
      </div>    
    </div>
  )
}

export default InstitutionShow
