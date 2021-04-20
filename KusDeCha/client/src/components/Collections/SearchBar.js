import React, { useState } from 'react'
import { useHistory } from 'react-router'

const SearchBar = () => {

  const [ searchTerm, setSearchTerm ] = useState(null)
  const history = useHistory()

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    history.push(`/search/#${searchTerm}`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          
        >Search</button>
      </form>
    </div>
  )
}

export default SearchBar
