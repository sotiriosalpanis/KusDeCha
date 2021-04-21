import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './Collections/SearchBar'

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation">
      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-start'>
          <div>
            <Link className='navbar-item' to='/explore'>
          Explore
            </Link>
          </div>
          <div>
            <SearchBar />
          </div>
          <div>
            <Link className='navbar-item' to='/scrapbooks'>
          Scrapbooks
            </Link>
          </div>
          <div>
            <Link className='navbar-item' to='/login'>
          Login
            </Link>
          </div>
          <div>
            <Link className='navbar-item' to='/register'>
          Register
            </Link>
          </div>
        </div>
      </div>
    </nav>

  )
}

export default Navbar
