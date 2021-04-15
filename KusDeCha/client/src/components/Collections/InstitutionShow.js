import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const InstitutionShow = () => {

  const { id } = useParams()

  const [ institution, setInstitution ] = useState(null)

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`/api/institutions/${id}`)
      setInstitution(data)
    }
    getData()
  },[])

  if (!institution) return null


  return (
    <div>
      {institution.institution_name}
    </div>
  )
}

export default InstitutionShow
