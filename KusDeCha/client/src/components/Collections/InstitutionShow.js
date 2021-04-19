import React, { useEffect, useState } from 'react'
import axios from 'axios'


import ObjectCard from './ObjectCard'

const InstitutionShow = () => {

  const apiRoot = 'https://api.wellcomecollection.org/catalogue/v2/'
  // const pageSize = 50

  const [ institution, setInstitution ] = useState(null)

  const [ pageNumber, setPageNumber ] = useState(1)
  const [ pageSize, setPageSize ] = useState(50)

  const [searchTerm, setSearchTerm ] = useState(null)
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
    <div>
      <div>
        {!searchTerm ? <p>{institution.totalResults}</p>
          : <p>{searchSet.totalResults}</p>
        }
        <form>
          <input
            onChange={handleChange}
            value={searchTerm}
            placeholder='Search'
          >
          </input>
          <select onChange={handlePageSize}>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </form>
      </div>
      <div>
        <div>
          <button
            onClick={handleNextPage}
          >+</button>
          {!searchTerm ? 
            <p>{pageNumber} of {institution.totalPages}</p>
            :
            <p>{pageNumber} of {searchSet.totalPages}</p>
          }
          {pageNumber > 1  ?
            <button
              onClick={handlePreviousPage}
            >-</button>
            :
            <p></p>
          }

        </div>
        <div>
          {!searchTerm ? institution.results.map(result => {
            return <ObjectCard key={result.id} { ...result } />
          })
            :
            searchSet.results.map(result => {
              return <ObjectCard key={result.id} { ...result } />
            })
          }
        </div>
      </div>

    </div>
  )
}

export default InstitutionShow
