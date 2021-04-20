import React, { useEffect, useState } from 'react'
import axios from 'axios'

import getTokenFromLocalStorage from '../../Auth/helpers/auth'
import CreateScrapbook from './CreateScrapbook'
import { Link } from 'react-router-dom'

const AddToScrapbook2 = ( { id,  source } ) => {

  const [ digitalImage, selectedDigitalImage ] = useState([])
  const [ selectScrapbook, setSelectScrapbook ] = useState(null)
  const [ newScrapbook, setNewScrapbook ] = useState(false)
  const [ scrapbookBody, setScrapbookBody ] = useState({
    origin_institution: 1,
    digital_image_id: source.id,
    catalogue_image_id: id,
    catalogue_title: source.title,
    work_type: source.type,
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
        const digitalImageArray = [ ...digitalImage, data.id ]
        selectedDigitalImage(digitalImageArray)
      } catch (err) {
        console.log(err.response)
      }
    } else {
      console.log('Already exists- skipped', digitalImage)
    }
  }

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get('/api/scrapbooks')
      setSelectScrapbook(data)
    }
    getData()
  },[])
  
  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get('/api/images')
      const existingDigitalImage = data.filter(image => {
        return image.catalogue_image_id === id
      })
      selectedDigitalImage( ...existingDigitalImage )
    }
    getData()
  },[])

  if (!selectScrapbook) return null

  const handleChange = event => {
    console.log(selectScrapbook[event.target.value])
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
    } catch (err) {
      console.log('Scrapbook error',err.response.data)
    }
  }

  const scrapbooksAlreadyAddedTo = selectScrapbook.filter(scrapbook => {
    const alreadyAddedto = scrapbook.digital_images.filter(digiImage => {
      return digiImage.catalogue_image_id === id
    })
    return alreadyAddedto.length > 0
  })


  return (
    <div>
      <div>
        {scrapbooksAlreadyAddedTo.length !== 0 ?
          <>
            <p>Already added to: </p>
            { scrapbooksAlreadyAddedTo.map(scrapbook => {
              return <Link to={`/scrapbooks/${scrapbook.id}`} key={scrapbook.id}>
                <p >{scrapbook.name}</p>
              </Link>
            })}
          </>
          :
          <p>Not added to any scrapbooks yet</p>
        }
      </div>
      <button
        onClick={handleImageSelection}
      >
        Add to scrapbook
      </button>
      <div>
        <form>
          <select onChange={handleChange}>
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
          
          <button
            onClick={handleSubmit}
          >+</button>
        </form>
        {newScrapbook ?
          <div>
            <CreateScrapbook />
          </div>
          :
          <p></p>
        }
      </div>
    </div>
  )
}

export default AddToScrapbook2
