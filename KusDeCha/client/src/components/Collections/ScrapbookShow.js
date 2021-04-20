import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import InstitutionSearchPreview from './InstitutionSearchPreview'
import ScrapbookImageCard from './ScrapbookImageCard'
import { userIsOwner, getTokenFromLocalStorage } from '../../Auth/helpers/auth'

const ScrapbookShow = () => {

  const history = useHistory()

  const [ scrapbook, setScrapbook ] = useState({
    name: '',
    creator: {},
    digital_images: [],
  })

  const [ searchTerm, setSearchTerm ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ formData, setFormData ] = useState({
    name: scrapbook.name,
  })
  const [ editable, setEditable ] = useState(false)


  const { id } = useParams()

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`/api/scrapbooks/${id}/`)
      setScrapbook(data)
    }
    getData()
  },[editable])

  const handleChange = event => {
    setSearchTerm(event.target.value)
    if (!event.target.value) setSearch(false)
  }

  const handleEdit = () => {
    setEditable(!editable)
  }

  const handleFormUpdate = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const { data } = await axios.put(`/api/scrapbooks/${id}/`,formData , {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log(data)
      setEditable(!editable)
    } catch (err) {
      console.log(err.response.data)
    }
  }


  useEffect(() => {
    setSearch(searchTerm)
  },[searchTerm])

  const handleDelete = async event => {
    event.preventDefault()
    try {
      const { data } = await axios.delete(`/api/scrapbooks/${id}/`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log(data)
      history.push('/scrapbooks')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  if (!scrapbook) return null

  

  return (
    <div>
      {!editable ?
        <h2>{scrapbook.name}</h2>
        :
        <form onSubmit={handleSubmit}>
          <input
            value={formData.name}
            name='name'
            onChange={handleFormUpdate}
            placeholder={scrapbook.name}
          />
          <button>+</button>
        </form>

    
      }
      
      <h3>by {scrapbook.creator.username} </h3>
      { userIsOwner(scrapbook.creator.id) ? 
        <div>
          <button
            onClick={handleEdit}
          >Edit</button>
          <button
            onClick={handleDelete}
          >Delete</button>
        </div> 
        :
        <h3>by {scrapbook.creator.username} </h3>
      }
      {scrapbook.digital_images.length > 0 ?
        scrapbook.digital_images.map(image => {
          return <div key={image.id}> 
            <h4 >{image.catalogue_title}</h4>
            <ScrapbookImageCard  imageInfo={image} />
          </div>

        })
        :
        <p>No images</p>
      }
      <div>
        <form>
          <input 
            value={searchTerm}
            onChange={handleChange}
          />
          <button type='submit'>Search</button>
        </form>
        { search ?
          <InstitutionSearchPreview searchTerm={search}/>
          :
          <p></p>
        }
        

        
      </div>
      
    </div>
  )
}

export default ScrapbookShow
