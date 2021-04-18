import axios from 'axios'
import React, { useState } from 'react'
import getTokenFromLocalStorage from '../../Auth/helpers/auth'

const CreateScrapbook = () => {

  const [ formData, setFormData ] = useState({ 
    name: '' ,
    digital_images: [],  
  })

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/scrapbooks/',formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log(response)
    } catch (err) {
      console.log(err.response.data.errors)
    }
    
  }

  console.log(formData)

  return (
    <div>
      <h3>Create a Scrapbook</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Give your Scrapbook a name'
          name='name'
          value={formData.name}
          onChange={handleChange}
        >
        </input>
        <button type='submit'>+</button>
      </form>
    </div>
  )
}

export default CreateScrapbook
