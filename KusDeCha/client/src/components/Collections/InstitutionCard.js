import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ObjectCard from './ObjectCard'

const InstitutionCard = ( { props } ) => {

  const pageNumber = Math.floor(Math.random() * 200 )
  const apiRoot = `${props.api_root}images`

  console.log(apiRoot,pageNumber)

  const [ randomPicture, setRandomPicture ] = useState(null)


  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`${apiRoot}?pageSize=10&page=${pageNumber}`)
      setRandomPicture(data.results)
    }
    getData()
  },[])

  if (!randomPicture) return null

  console.log(randomPicture)

  return (
    <div>
      <h2>{props.institution_name}</h2>
      <hr />
      <p>{props.description}</p>
      <p>Visit the website: {props.website}</p>
      <ObjectCard { ...randomPicture[0] } size={1} />
    </div>
  )
}

export default InstitutionCard
