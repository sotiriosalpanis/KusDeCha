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
    <section>
      <h3>Register</h3>

      <div>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            placeholder='Username'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            placeholder='someone@example.com'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter your password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          <label>Password confirmation</label>
          <input
            type='password'
            placeholder='Confirm your password'
            name='password_confirmation'
            value={formData.password_confirmation}
            onChange={handleChange}
          />
          <button type='submit'>Register</button>
        </form>

      </div>

    </section>
  )
}

export default Register
