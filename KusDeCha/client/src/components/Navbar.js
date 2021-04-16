import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div>
        <Link to='/'>
          Home
        </Link>
      </div>
      <div>
        <Link to='/institutions'>
          Institutions
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
