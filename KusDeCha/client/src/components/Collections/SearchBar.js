import React, { useState, useEffect } from 'react'
import InstitutionSearchPreview from './InstitutionSearchPreview'

const SearchBar = () => {

  const [ searchTerm, setSearchTerm ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ activeModal, setActiveModal ] = useState(null)

  const handleChange = event => {
    setSearchTerm(event.target.value)
    if (!event.target.value) setSearch(false)
  }

  const handleModal = () => {
    console.log('Click')
    setActiveModal(null)
  }

  useEffect(() => {
    setSearch(searchTerm)
    setActiveModal('is-active')
  },[searchTerm])

  return (
    <div>
      <div className='field'>
        <form className='is-quarter'>
          <input 
            className='input'
            value={searchTerm}
            onChange={handleChange}
            placeholder='Enter search term to find more images...'
          />
          {/* <button 
                className='button'
                type='submit'>Search</button> */}
        </form>
        { search ?
          <div className={`modal ${activeModal}`}>
            <div className='modal-background'></div>
            <div className='modal-card'>
              <input 
                className='input'
                value={searchTerm}
                onChange={handleChange}
              />
              <InstitutionSearchPreview className='box' searchTerm={search}/>
            </div>
            <button 
              className='modal-close is-large' 
              aria-label='close'
              onClick={handleModal}
            >
            </button>
          </div>
              
          :
          <p></p>
        }
      </div>
    </div>
  )
}

export default SearchBar
