import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ObjectShow = () => {

  const { id } = useParams()
  const apiRoot = 'https://iiif.wellcomecollection.org/image'

  const [ objectImage, setObjectImage ] = useState(null)

  console.log(id)

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`${apiRoot}/${id}/info.json`)
      setObjectImage( data )
    }
    getData()
  },[])

  if (!objectImage) return null

  const imageURLRoot = objectImage['@id']
  const imageHeight = objectImage.sizes[0].height
  const imageWidth = objectImage.sizes[0].width
  const imageFormat = objectImage.profile[1].formats
  const image = `${imageURLRoot}/full/${imageWidth},${imageHeight}/0/default.${imageFormat}`

  return (
    <div>
      <img src={image} />
    </div>
  )
}

export default ObjectShow
