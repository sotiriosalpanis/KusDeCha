import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function InstitutionIndex() {

  const [ institutions, setInstitutions ] = useState(null)

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get('api/institutions')
      setInstitutions(data)
    }
    getData()
  },[])

  console.log(institutions)

  return (
    <div>
      { institutions && 
        <div>
          { institutions.map(institution => (

            <Link to={`/institutions/${institution.id}`} key={institution.id} {...institution}>
              {institution.institution_name}
            </Link>

          ))}
        </div>
      
      }
    </div>
  )

}

export default InstitutionIndex
