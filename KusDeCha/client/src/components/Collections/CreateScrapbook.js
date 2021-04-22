import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import getTokenFromLocalStorage from '../../Auth/helpers/auth'

const CreateScrapbook = () => {

  const history = useHistory()

  const [ formData, setFormData ] = useState({ 
    name: '' ,
    digital_images: [],  
  })

  const handleChange = event => {
    console.log(formData)
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    console.log(formData)
    try {
      const { data } = await axios.post('/api/scrapbooks/',formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log('Scrapbook',data)
      history.push(`scrapbooks/${data.id}`)
    } catch (err) {
      console.log(err.response.data.errors)
    }
    
  }


  return (
    <div className='create-scrapbook'>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <input
            className='input'
            placeholder='Give your Scrapbook a name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          >
          </input>
        </div>
     
        <div className='field'>
          <button 
            type='submit'
            className='button'
          >Create
          </button>
        </div>
      </form>
    </div>


  )
}

export default CreateScrapbook
