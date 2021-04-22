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
      history.push('/explore')
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }


  return (
    <section className='section home'>
      <div className='container'>
        <div className='columns'>
          <form className='box column is-half is-offset-one-quarter auth-form' onSubmit={handleSubmit}>
            <div>
              <h3 className='subtitle'>Login</h3>
            </div>
            <div className='field'>
              <label className='label'>Username</label>
              <div className='control'>
                <input
                  className='input is-medium'
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
                  className='input is-medium'
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
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

    </section>
  )
}

export default Login
