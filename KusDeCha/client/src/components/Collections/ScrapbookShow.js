import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const ScrapbookShow = () => {

  const [ scrapbook, setScrapbook ] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get(`/api/scrapbooks/${id}`)
      setScrapbook(data)
    }
    getData()
  },[])


  if (!scrapbook) return null

  console.log(scrapbook)

  return (
    <div>
      <h2>{scrapbook.name}</h2>
    </div>
  )
}

export default ScrapbookShow
