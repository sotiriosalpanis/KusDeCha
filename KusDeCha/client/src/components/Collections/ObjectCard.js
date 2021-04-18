import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ObjectCard = ({ thumbnail, id }) => {

  const [ objectImage, setObjectImage ] = useState(null)

  console.log('id',id)

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(thumbnail.url)
      setObjectImage( data )
    }
    getData()
  },[])

  if (!objectImage) return null

  const imageURLRoot = objectImage['@id']
  const imageID = imageURLRoot.split('/').slice(-1)[0]
  const imageHeight = objectImage.sizes[2].height
  const imageWidth = objectImage.sizes[2].width
  const imageFormat = objectImage.profile[1].formats
  const image = `${imageURLRoot}/full/${imageWidth},${imageHeight}/0/default.${imageFormat}`

  return (
    // <Link to={`/object/${imageID}`}>
    <Link to={{
      pathname: `/object/${id}`,
      hash: `#${imageID}`,
    }}>
      <img src={image}/>
    </Link>
  )
}

export default ObjectCard
