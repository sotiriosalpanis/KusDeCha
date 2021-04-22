import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './Collections/SearchBar'
import { userIsAuthenticated } from '../Auth/helpers/auth'
import axios from 'axios'

const Navbar = () => {

  const [ institutions, setInstitutions ] = useState(null)
  const [dropdown, setDropdown ] = useState(false)

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }



  useEffect(() => {
    const getData = async() => {
      const { data } = await axios.get('/api/institutions/')
      setInstitutions(data)
    }
    getData()
  },[])

  if (!institutions) return null
  console.log(institutions)

  return (
    <nav className="navbar is-transparent is-fixed-top" role="navigation">
      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-start'>
          { dropdown ? 
            <div 
              className='navbar-item has-dropdown is-active'
              onMouseLeave={() => setDropdown(false)}  
            >
              <Link className='navbar-link' to='/explore'>
                  Explore
              </Link>
                  
              <div className='navbar-dropdown'>
                {institutions.map(institution => {
                  return <Link 
                    key={institution.id} 
                    className='navbar-item'
                    to={`explore/${institution.institution_name.replace(' ','')}`}
                  >
                    {institution.institution_name}
                  </Link>
        
                })}
              </div>
            </div>
            :
            <div 
              className='navbar-item has-dropdown'
              onMouseEnter={() => setDropdown(true)}    
            >
              <Link className='navbar-link' to='/explore'>
                Explore
              </Link>
                
              <div className='navbar-dropdown'>
                {institutions.map(institution => {
                  return <Link 
                    key={institution.id} 
                    className='navbar-item'
                    to={`explore/${institution.institution_name.replace(' ','')}`}
                  >
                    {institution.institution_name}
                  </Link>
      
                })}
              </div>
            </div>  
          }
          <div 
            className='navbar-item has-dropdown is-active'
            // onMouseEnter={handleDropdown}  
          >
          </div>
          

        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>
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
          { userIsAuthenticated() &&
            <Link to='/explore' onClick={handleLogout} className="navbar-item">Log out</Link>
          }
        </div>
          
        
      </div>
    </nav>

  )
}

export default Navbar
