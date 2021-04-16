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
    <section>
      <h3>Login</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            placeholder='Username'
            name='username'
            value={formData.username}
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
          <button type='submit'>Login</button>
        </form>
      </div>

    </section>
  )
}

export default Login
