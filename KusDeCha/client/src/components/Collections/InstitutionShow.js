import React, { useEffect, useState } from 'react'
import axios from 'axios'


import ObjectCard from './ObjectCard'

const InstitutionShow = () => {

  const apiRoot = 'https://api.wellcomecollection.org/catalogue/v2/'
  const pageSize = 10
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


  return (
    <div>
      {results.map(result => {
        return <ObjectCard key={result.id} { ...result } />
      })
      }
    </div>
  )
}

export default InstitutionShow
