import React, { useEffect, useState } from 'react'
import axios from 'axios'

import getTokenFromLocalStorage from '../../Auth/helpers/auth'
import CreateScrapbook from './CreateScrapbook'
import { Link } from 'react-router-dom'

const AddToScrapbook = ( { id,  source, thumbnail } ) => {

  const [ digitalImage, selectedDigitalImage ] = useState([])
  const [ selectScrapbook, setSelectScrapbook ] = useState(null)
  const [ newScrapbook, setNewScrapbook ] = useState(false)
  const [ activeModal, setActiveModal ] = useState(null)
  const [ scrapbookBody, setScrapbookBody ] = useState({
    origin_institution: 1,
    digital_image_id: source.id,
    catalogue_image_id: id,
    catalogue_title: source.title,
    work_type: source.type,
    iiif_manifest: thumbnail.url,
    tags: [],
  })




  const handleImageSelection = async() => {
    if (!digitalImage) {
      try {
        const { data } = await axios.post('/api/images/', scrapbookBody, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        const digitalImageArray =  data 
        selectedDigitalImage(digitalImageArray)
      } catch (err) {
        console.log(err.response)
      }
    } else {
      console.log('Already exists- skipped', digitalImage)
    }
    setActiveModal('is-active')
  }

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get('/api/scrapbooks')
      setSelectScrapbook(data)
    }
    getData()
  },[activeModal])
  
  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get('/api/images')
      const existingDigitalImage = data.filter(image => {
        return image.catalogue_image_id === id
      })
      if (existingDigitalImage.length === 0) {
        selectedDigitalImage(null)
      } else {
        selectedDigitalImage( ...existingDigitalImage )
      }

    }
    getData()
  },[])

  if (!selectScrapbook) return null

  const handleChange = event => {
    if (event.target.value !== 'new') {
      setNewScrapbook(false)
      let existingImages = []
      if (selectScrapbook[event.target.value].digital_images.length > 0) {
        existingImages = selectScrapbook[event.target.value].digital_images.map(image => image.id)
        
      }
      const updatedScrapbookBody = { ...selectScrapbook[event.target.value], ['digital_images']: [...existingImages, digitalImage.id ] }
      setScrapbookBody(updatedScrapbookBody)
    } else {
      setNewScrapbook(true)
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
      setActiveModal(null)
    } catch (err) {
      console.log('Scrapbook error',err.response.data)
      setActiveModal(null)
    }
  }

  const handleModalClose = () => {
    setActiveModal(null)
  }

  const scrapbooksAlreadyAddedTo = selectScrapbook.filter(scrapbook => {
    const alreadyAddedto = scrapbook.digital_images.filter(digiImage => {
      return digiImage.catalogue_image_id === id
    })
    return alreadyAddedto.length > 0
  })


  return (
    <div className='container box'>
      <div className='columns'>
        {scrapbooksAlreadyAddedTo.length !== 0 ?
          <>
            <p className='column subtitle is-5'>Scrapbooks </p>
            { scrapbooksAlreadyAddedTo.map(scrapbook => {
              return <Link to={`/scrapbooks/${scrapbook.id}`} 
                className='box scrapbook'
                key={scrapbook.id}>
                <p className='subtitle is-6'>{scrapbook.name}</p>
              </Link>
            })}
          </>
          :
          <p>Not part of any scrapbooks</p>
        }
      </div>
      <button className='button'
        onClick={handleImageSelection}
      >
        +
      </button>
      <div className={`modal ${activeModal}`}>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <div className='columns'>
            <div className='box column is-half is-offset-one-quarter popup'>
              <p className='subtitle is-4'>Add image to a scrapbook</p>
              <form>
                <div className='select'>
                  <select 
                    onChange={handleChange}
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
                    <option
                      value='new'
                    >New</option>
                  </select>
                </div>
              </form>
              {newScrapbook ?
                <div>
                  <CreateScrapbook />
                </div>
                :
                <p></p>
              }
              <div className='field'>
                <button
                  className='button'
                  onClick={handleSubmit}
                >+</button>
              </div>
            </div>
            
            <button 
              className='modal-close is-large' 
              aria-label='close'
              onClick={handleModalClose}
            >
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddToScrapbook
