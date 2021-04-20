import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ScrapbookImageCard from './ScrapbookImageCard'
// import getTokenFromLocalStorage from '../../Auth/helpers/auth'

const ScrapbookShow = () => {

  const [ scrapbook, setScrapbook ] = useState({
    name: '',
    creator: {},
    digital_images: [],
  })

  const { id } = useParams()

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`/api/scrapbooks/${id}/`)
      setScrapbook(data)
    }
    getData()
  },[])



  // const handleChange = async event => {
  //   console.log(event.target.name)
  //   const digitalImageArray = scrapbook.digital_images.map(image => {
  //     return image.id
  //   })
  //   const newFormData = { ...scrapbook , [event.target.name]: event.target.value, ['digital_images']: [...digitalImageArray] }
  //   setScrapbook(newFormData)
    
  //   try {
  //     const { data } = await axios.put(`/api/scrapbooks/${id}/`, scrapbook,{
  //       headers: {
  //         Authorization: `Bearer ${getTokenFromLocalStorage()}`,
  //       },
  //     })
  //     console.log(data)
  //   } catch (err) {
  //     console.log(err.response.data)
  //   }
  // }



  if (!scrapbook) return null

  // console.log(scrapbook)

  return (
    <div>
      {/* <form>
        <input
          onChange={handleChange}
          name='name'
          value={scrapbook.name}
          placeholder={scrapbook.name}
        />
          
      </form> */}
      <h2>{scrapbook.name}</h2>
      <h3>by {scrapbook.creator.username}</h3>
      {scrapbook.digital_images.length > 0 ?
        scrapbook.digital_images.map(image => {
          return <ScrapbookImageCard key={image.id} imageInfo={image} />
        })
        :
        <p>No images</p>
      }
    </div>
  )
}

export default ScrapbookShow
