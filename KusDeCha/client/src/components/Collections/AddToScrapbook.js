import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AddToScrapbook = ({ id, digitalId, source }) => {

  // console.log('DIGI ID>>',digitalId)
  // * Information required for the post request:

  //  scrapbook
  // digital_image_id 
  // catalogue_image_id 
  // tags = ArrayField
  // catalogue_title 
  // work_type
  // origin_institution
  // creator


  const [ scrapbookBody, setScrapbookBody ] = useState({
    digital_image_id: digitalId,
    catalogue_image_id: id,
    catalogue_title: source.title,
    work_type: source.type,
    creator: '',
  })

  const [ scrapbookOptions, setScrapbookOptions ] = useState(null)

  useEffect(() =>{
    const getData = async() => {
      const { data } = await axios.get('/api/scrapbooks/')
      setScrapbookOptions(data)
    }
    getData()
  },[])

  console.log(scrapbookBody, setScrapbookBody)

  if (!scrapbookOptions) return null

  return (
    <div>
      <form>
        <select name="scrapbooks">
          <option>New</option>
          {scrapbookOptions.map(scrapbookOption => {
            return <option key={scrapbookOption.id}>{scrapbookOption.name}</option>
          })}
        </select>
        <button type='submit'>+</button>
      </form>
      
    </div>
  )
}

export default AddToScrapbook
