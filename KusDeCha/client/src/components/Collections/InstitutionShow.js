import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import getTokenFromLocalStorage from '../../Auth/helpers/auth'


import ObjectCard from './ObjectCard'

const InstitutionShow = ( ) => {


  const apiRoot = 'https://api.wellcomecollection.org/catalogue/v2/'

  const [ institution, setInstitution ] = useState(null)

  const [ pageNumber, setPageNumber ] = useState(1)
  const [ pageSize, setPageSize ] = useState(50)

  const [searchTerm, setSearchTerm ] = useState('')
  const [searchSet, setSearchSet ] = useState(null)
  const [ imageArray, setimageArray ] = useState([])
  const [ imageToPost, setImageToPost ] = useState({})
  const [ selectScrapbook, setSelectScrapbook ] = useState(null)
  const [ scrapbookBody, setScrapbookBody ] = useState({})

  const [ disableButton, setdisableButton ] = useState(false)


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

  const handleSelect = (event) => {
    const imageToAdd = institution.results[event.target.value]
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
      institution.results[event.target.value] = updatedResults
    } else {
      setImageToPost({ ...imageToAddObject })
      updatedResults = { ...imageToAdd, ['disabled']: true }
    }
    institution.results[event.target.value] = updatedResults
    setdisableButton(!disableButton)
  }

  const handleSelectSearch = (event) => {
    const imageToAdd = searchSet.results[event.target.value]
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
      institution.results[event.target.value] = updatedResults
    } else {
      setImageToPost({ ...imageToAddObject })
      updatedResults = { ...imageToAdd, ['disabled']: true }
    }
    searchSet.results[event.target.value] = updatedResults
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
    } catch (err) {
      console.log('Scrapbook error',err.response.data)
    }
  }


  if (!institution) return null

  console.log('$$$$$$',!imageToPost)

  
  return (
    <div className='section'>
      <div className='container'>
        <div className='box sticky-header'>
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
          <h2 className='subtitle is-2'>Explore the Wellcome Collection</h2>
          {!searchTerm ? <p className='subtitle is-5'>Browse {institution.totalResults} images</p>
            : <p className='subtitle is-5'>&apos;{searchTerm}&apos; returned {searchSet.totalResults}</p>
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
        <div>
          <div className='columns is-multiline results-page'>
            {!searchTerm ? institution.results.map((result, index )=> {
              return <div key={result.id}
                className='relative-container object'
              >
                <Link
                  to={ `/object/${result.id}`}
                >
                  <ObjectCard  { ...result } size={1} disabled={result.disabled}/>
                </Link>
                <button
                  className='absolute-container button is-info is-small is-inverted is-rounded'
                  value={index}
                  onClick={handleSelect}
                >
                  X
                </button>
              </div>

            })
              :
              searchSet.results.map((result, index) => {
                return <div key={result.id}
                  className='relative-container'
                >
                  <Link
                    to={ `/object/${result.id}`}
                  >
                    <ObjectCard  { ...result } size={1} disabled={result.disabled}/>
                  </Link>
                
                  <button
                    className='absolute-container button is-info is-small is-inverted is-rounded'
                    value={index}
                    onClick={handleSelectSearch}
                  >
                  X
                  </button>
                </div>
            
              })
            }
          </div>
        </div>
      </div>    
    </div>
  )
}

export default InstitutionShow
