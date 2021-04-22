import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import ObjectCard from './ObjectCard'
import getTokenFromLocalStorage from '../../Auth/helpers/auth'

const InstitutionShowSearch = ( ) => {
  
  const { hash } = useLocation()
  const searchTerm = hash.replace('#','')
  const apiRoot = 'https://api.wellcomecollection.org/catalogue/v2/'

  const [ searchResults, setSearchResults ] = useState(null)
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ imageToPost, setImageToPost ] = useState({})
  const [ disableButton, setdisableButton ] = useState(false)
  const [ imageArray, setimageArray ] = useState([])
  const [ scrapbookBody, setScrapbookBody ] = useState({})
  const [ selectScrapbook, setSelectScrapbook ] = useState(null)

  const pageSize = 100

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`${apiRoot}images?pageSize=${pageSize}&page=${pageNumber}&query=${searchTerm}`)
      setSearchResults(data)
    }
    getData()
  },[pageNumber])


  const handleNextPage = () => {
    const nextPage = pageNumber + 1
    setPageNumber(nextPage)
  }
  const handlePreviousPage = () => {
    const nextPage = pageNumber - 1
    setPageNumber(nextPage)
  }

  const handleSelect = (event) => {
    const imageToAdd = searchResults.results[event.target.value]
    const imageToAddObject = {
      origin_institution: 1,
      digital_image_id: imageToAdd.source.id,
      catalogue_image_id: imageToAdd.id,
      catalogue_title: imageToAdd.source.title,
      work_type: imageToAdd.source.type,
      iiif_manifest: imageToAdd.thumbnail.url,
      tags: [],
    }
    let updatedResults
    if (imageToAdd.disabled) {
      updatedResults = { ...imageToAdd, ['disabled']: false }
      searchResults.results[event.target.value] = updatedResults
    } else {
      setImageToPost({ ...imageToAddObject })
      updatedResults = { ...imageToAdd, ['disabled']: true }
    }
    searchResults.results[event.target.value] = updatedResults
    setdisableButton(!disableButton)
  }

  useEffect( async() => {
    try {
      const { data } = await axios.post('/api/images/', imageToPost, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      setimageArray([ ...imageArray, data.id ])
      console.log(imageArray)
    } catch (err) {
      console.log(err.request)
    }
    
  },[imageToPost])

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get('/api/scrapbooks')
      setSelectScrapbook(data)
    }
    getData()
  },[])

  const handleScrapbookSelect = event => {
    if (event.target.value !== 'new') {
      let existingImages = []
      if (selectScrapbook[event.target.value].digital_images.length > 0) {
        existingImages = selectScrapbook[event.target.value].digital_images.map(image => image.id)
        
      }
      const updatedScrapbookBody = { ...selectScrapbook[event.target.value], ['digital_images']: [ ...existingImages, ...imageArray ] }
      setScrapbookBody(updatedScrapbookBody)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.put(`/api/scrapbooks/${scrapbookBody.id}/`,scrapbookBody, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log('Success',response)
      setimageArray([])
    } catch (err) {
      console.log('Scrapbook error',err.response.data)
    }
  }



  if (!searchResults) return null


  return (
    <section className='section institution'>
      <div className='container'>
        <div className='box sticky-header'>
          <h2 className='subtitle is-3'>You searched for {searchTerm}</h2>
          <h3 className='subtitle'>There are {searchResults.totalResults} results on {searchResults.totalPages} pages</h3>

          <div>
            <nav className='pagination is-left' role='navigation' aria-label='pagination'>
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
            { imageArray.length > 0 &&
              <div>
                <form>
                  <div className='select'>
                    <select 
                      onChange={handleScrapbookSelect}
                      defaultValue='Choose a scrapbook'
                    >
                      <option
                        disabled={true}
                      >Choose a scrapbook</option>
                      {selectScrapbook.map((scrapbook, index) => {
                        return <option
                          key={scrapbook.id}
                          value={index}
                        >
                          {scrapbook.name}
                        </option>
                      })}
                    </select>
                  </div>
                </form>
                <button
                  className='button'
                  onClick={handleSubmit}
                >
              Add
                </button>
              </div>
            }
          </div>
        </div>
        <section>
          <div className='columns is-multiline results-page'>
            {searchResults.results.map((result,index) => {
              return <div key={result.id}
                className='relative-container object'
              >
                <Link
                  to={ `/object/${result.id}`}
                >
                  <ObjectCard  { ...result } size={1} disabled={result.disabled}/>
                </Link>
                
                <button
                  className='absolute-container button is-info is-small is-inverted'
                  value={index}
                  onClick={handleSelect}
                >
                  X
                </button>
              </div>

            })}
          </div>

        </section>

        
      </div>
    </section>
    
  )
}

export default InstitutionShowSearch
