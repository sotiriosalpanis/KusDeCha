import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getTokenFromLocalStorage from '../../Auth/helpers/auth'
import CreateScrapbook from './CreateScrapbook'

const AddToScrapbook = ({ id, digitalId, source }) => {

  const scrapbookBody = {
    origin_institution: 1,
    digital_image_id: digitalId,
    catalogue_image_id: id,
    catalogue_title: source.title,
    work_type: source.type,
    tags: [],
  }

  const [ scrapbookOptions, setScrapbookOptions ] = useState(null)

  const [ selectedDigitalImage, setSelectedDigitalImage ] = useState({
    name: '',
    digital_images: [],
  })

  useEffect(() =>{
    const getData = async() => {
      const { data } = await axios.get('/api/scrapbooks/')
      setScrapbookOptions(data)
    }
    getData()
  },[])

  const handleSelect = event => {
    if (event.target.value === '0') {
      return setSelectedDigitalImage({ ...selectedDigitalImage, ['name']: 'New' })
    }
    
    const selectedName = scrapbookOptions.filter(scrapbook => {
      if (scrapbook.id === Number(event.target.value)){
        return scrapbook.name
      }
    })
    setSelectedDigitalImage({ ...selectedDigitalImage, ['id']: event.target.value, ['name']: selectedName[0].name })
  }


  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/images/', scrapbookBody, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      const newSelectedImage = [data.id]
      const updatedImageSelection = { ...selectedDigitalImage , ['digital_images']: [ ...newSelectedImage ] }
      console.log(selectedDigitalImage['digital_images'])
      setSelectedDigitalImage(updatedImageSelection)
      console.log('DIGITAL IMAGE BODY>>>',selectedDigitalImage)
    } catch (err) {
      console.log('Digital Image error',err.response.data)
    }
    try {
      const response = await axios.put(`/api/scrapbooks/${selectedDigitalImage.id}/`,selectedDigitalImage, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log(response)
    } catch (err) {
      console.log('Scrapbook error',err.response.data)
    }
  } 


  if (!scrapbookOptions) return null

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select 
          onChange={handleSelect}
        >
          <option
            value='0'
          >
            New
          </option>
          {scrapbookOptions.map(scrapbookOption => {
            return <option 
              key={scrapbookOption.id}
              value={scrapbookOption.id}
            >
              {scrapbookOption.name}
            </option>
          })}
        </select>
        { selectedDigitalImage.name === 'New' ? <CreateScrapbook /> : <p>Nowt</p>}
        <input 
          type='text'
          name='tags'
          placeholder='Enter any tags here'
        />
        <button type='submit'>+</button>
      </form>
      
    </div>
  )
}

export default AddToScrapbook
