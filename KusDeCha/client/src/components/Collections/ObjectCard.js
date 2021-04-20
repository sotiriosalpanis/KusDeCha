import axios from 'axios'
import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'

const ObjectCard = ({ thumbnail, size }) => {

  const [ objectImage, setObjectImage ] = useState(null)

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(thumbnail.url)
      setObjectImage( data )
    }
    getData()
  },[])

  if (!objectImage) return null

  const imageURLRoot = objectImage['@id']
  const imageHeight = objectImage.sizes[size].height
  const imageWidth = objectImage.sizes[size].width
  const imageFormat = objectImage.profile[1].formats
  const image = `${imageURLRoot}/full/${imageWidth},${imageHeight}/0/default.${imageFormat}`

  return (
    <>
      <img src={image}/>
    </>
  )
}

export default ObjectCard
