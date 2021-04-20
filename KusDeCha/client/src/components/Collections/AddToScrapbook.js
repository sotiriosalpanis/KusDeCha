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
        return scrapbook
      }
    })
    setSelectedDigitalImage({ ['digital_images']: [ selectedName[0].digital_images[0].id ] , ['id']: event.target.value, ['name']: selectedName[0].name })
  }

  const handleDigitalImageSubmit = async () => {
    try {
      const { data } = await axios.post('/api/images/', scrapbookBody, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log('Previous- in scrapbook already',selectedDigitalImage.digital_images)
      console.log('Image to add', data.id)
      const digitalImageId = [ ...selectedDigitalImage.digital_images ,data.id]
      console.log('List afterwards',digitalImageId)
      const updatedSelectedImageSelection = { ...selectedDigitalImage, ['digital_images']: [ ...digitalImageId ] }
      setSelectedDigitalImage(updatedSelectedImageSelection)
    } catch (err) {
      console.log(err)
    }
  }

  console.log('SELECTIONS>>>>', selectedDigitalImage)

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.put(`/api/scrapbooks/${selectedDigitalImage.id}/`,selectedDigitalImage, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log('Success',response)
    } catch (err) {
      console.log('Scrapbook error',err.response.data)
    }
  } 


  if (!scrapbookOptions) return null

  return (
    <div>
      <button onClick={handleDigitalImageSubmit}>Add to collection</button>
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
