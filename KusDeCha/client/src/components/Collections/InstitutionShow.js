import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import axios from 'axios'

const InstitutionShow = () => {

  const apiRoot = 'https://api.wellcomecollection.org/catalogue/v2/'
  const pageSize = 50
  const page = 1

  const [ institution, setInstitution ] = useState(null)

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`${apiRoot}images?pageSize=${pageSize}&page=${page}`)
      setInstitution(data)
    }
    getData()
  },[])

  

  if (!institution) return null

  
  const { results } = institution

  console.log('API DATA',results)

  results.map(result => {
    // console.log(result.id)
    // console.log(result.source.title)
    console.log(result)
  })

  return (
    <div>
      HIYA!
    </div>
  )
}

export default InstitutionShow
