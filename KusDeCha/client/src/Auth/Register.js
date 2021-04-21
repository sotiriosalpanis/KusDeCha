import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {

  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/register/',formData)
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
              <h3>Register</h3>
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
              <label className='label'>Email</label>
              <div className='control'>
                <input
                  className='input is-small'
                  placeholder='someone@example.com'
                  name='email'
                  value={formData.email}
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
              <label className='label'>Password confirmation</label>
              <div className='control'>
                <input
                  className='input is-small'
                  type='password'
                  placeholder='Confirm your password'
                  name='password_confirmation'
                  value={formData.password_confirmation}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='field'>
              <button className='button' type='submit'>Register</button>
            </div>
          
          </form>

        </div>
      </div>
    </section>
  )
}

export default Register
