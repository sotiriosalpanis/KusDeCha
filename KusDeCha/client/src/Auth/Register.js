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

  const [ registrationSuccess, setregistrationSuccess ] = useState(null)
  const [ registrationFail, setregistrationFail ] = useState(null)

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/register/',formData)
      console.log(response.data)
      setregistrationSuccess(true)
    } catch (err) {
      console.log()
      for (const [key, value] of Object.entries(err.response.data)) {
        console.log(key, value[0])
        setregistrationFail(`${key} : ${value[0]}`)
      }
    }
  }



  return (
    <section className='section'>
      <div className='container'>
        <div className='columns'>
          <form className='box column is-half is-offset-one-quarter auth-form' onSubmit={handleSubmit}>
            <div>
              <h3 className='subtitle'>Register</h3>
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
              <label className='label'>Email</label>
              <div className='control'>
                <input
                  className='input is-medium'
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
              <label className='label'>Password confirmation</label>
              <div className='control'>
                <input
                  className='input is-medium'
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
            <div>
              { registrationFail ?
                <>
                  <p className='help is-danger'>Oh no! There is a problem</p>
                  <p className='help is-danger'>{registrationFail}</p>
                </>
                :
                <p></p>
              }
              { registrationSuccess ?
                <>
                  <p className='help is-success'>Yay! You registered successfully</p>
                  <p className='help is-success'>Please log in</p>
                </>
                :
                <p></p>
              }
              
              
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

export default Register
