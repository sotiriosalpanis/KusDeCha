import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

const ScrapbookImageCard = ( { imageInfo, size }) => {

  // console.log(size)


  const [ image, setImage ] = useState(null)

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`${imageInfo.iiif_manifest}`)
      setImage(data)
    }
    getData()
  },[])



  if (!image) return null

  const imageURLRoot = image['@id']
  const imageHeight = image.sizes[size].height
  const imageWidth = image.sizes[size].width
  const imageFormat = image.profile[1].formats
  const imageURL = `${imageURLRoot}/square/${imageWidth},${imageHeight}/0/default.${imageFormat}`

  // to

  return (
    <section>
      <div>
        <img
          src={imageURL} />
      </div>
      
    </section>
  )
}

export default ScrapbookImageCard
