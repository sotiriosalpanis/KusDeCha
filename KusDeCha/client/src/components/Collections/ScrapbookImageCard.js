import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ScrapbookImageCard = ( { imageInfo }) => {


  const [ image, setImage ] = useState(null)

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`https://iiif.wellcomecollection.org/image/${imageInfo.digital_image_id}`)
      setImage(data)
    }
    getData()
  },[])

  if (!image) return null

  const imageURLRoot = image['@id']
  const imageHeight = image.sizes[2].height
  const imageWidth = image.sizes[2].width
  const imageFormat = image.profile[1].formats
  const imageURL = `${imageURLRoot}/square/${imageWidth},${imageHeight}/0/default.${imageFormat}`


  return (
    <div>
      <img src={imageURL} />
    </div>
  )
}

export default ScrapbookImageCard
