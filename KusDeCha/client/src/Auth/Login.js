import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const history = useHistory()

  const [ formData, setFormData ] = useState({
    username: '',
    password: '',
  })

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/login/',formData)
      window.localStorage.setItem('token', response.data.token )
      history.push('/institutions')
      console.log(response)
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }


  return (
    <section className='section'>
      <div className='container'>
        <div className='columns'>
          <form className='box column is-half is-offset-one-quarter' onSubmit={handleSubmit}>
            <div>
              <h3>Login</h3>
            </div>
            <div className='field'>
              <label className='label'>Username</label>
              <div className='control'>
                <input
                  className='input is-small'
                  placeholder='Username'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Password</label>
              <div className='control'>
                <input
                  className='input is-small'
                  type='password'
                  placeholder='Enter your password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='field'>
              <button className='button' type='submit'>Login</button>
            </div>
          </form>
        </div>
        
      </div>

    </section>
  )
}

export default Login
