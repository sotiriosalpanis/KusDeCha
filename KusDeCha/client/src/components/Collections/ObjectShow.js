// import React, { useState, useEffect } from 'react'
import React from 'react'
import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { OpenSeaDragonViewer } from 'openseadragon-react-viewer'

const ObjectShow = () => {

  const { id } = useParams()
  const apiRoot = 'https://iiif.wellcomecollection.org/image'

  const manifestURL = `${apiRoot}/${id}/info.json`

  console.log(manifestURL)

  const options = {
    showDropdown: true,
    showThumbnails: false,
    showToolbar: true,
    deepLinking: true,
    height: 800,
  }
  console.log(options)

  // const [ objectImage, setObjectImage ] = useState(null)

  // console.log(id)

  // useEffect(() => {
  //   const getData = async() => {
  //     const { data } = await axios.get(`${apiRoot}/${id}/info.json`)
  //     setObjectImage( data )
  //   }
  //   getData()
  // },[])

  // if (!objectImage) return null

  // const imageURLRoot = objectImage['@id']
  // const imageHeight = objectImage.sizes[0].height
  // const imageWidth = objectImage.sizes[0].width
  // const imageFormat = objectImage.profile[1].formats
  // const image = `${imageURLRoot}/full/${imageWidth},${imageHeight}/0/default.${imageFormat}`

  return (
    // <OpenSeaDragonViewer manifestURL={manifestURL} options={options} />
    <p>Page broken</p>
  )
}

export default ObjectShow
