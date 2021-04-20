import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div>
        <Link to='/explore'>
          Explore
        </Link>
      </div>
      <div>
        <Link to='/scrapbooks'>
          Scrapbooks
        </Link>
      </div>
      <div>
        <Link to='/login'>
          Login
        </Link>
      </div>
      <div>
        <Link to='/register'>
          Register
        </Link>
      </div>
    </div>
  )
}

export default Navbar
