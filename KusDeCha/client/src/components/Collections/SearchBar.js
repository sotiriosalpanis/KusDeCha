import React, { useState, useEffect } from 'react'
import InstitutionSearchPreview from './InstitutionSearchPreview'

const SearchBar = () => {

  const [ searchTerm, setSearchTerm ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ activeModal, setActiveModal ] = useState(null)
  const [searchActive, setSearchActive ] = useState(false)

  const handleChange = event => {
    setSearchTerm(event.target.value)
    if (!event.target.value) setSearch(false)
  }

  const handleModal = () => {
    setActiveModal(null)
  }

  const handleEnter = () => {
    setSearchActive(false)
  }
  const handleLeave = () => {
    setSearchActive(true)
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
            // className='input'
            className={ searchActive ? 'input' : 'search-bar input'}
            value={searchTerm}
            onChange={handleChange}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            placeholder='Enter search term to find more images...'
          />
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
