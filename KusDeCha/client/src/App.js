import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import InstitutionIndex from './components/collections/InstitutionIndex'
import InstitutionShow from './components/collections/InstitutionShow'
import Login from './auth/Login'
import Register from './auth/Register'
import ObjectShow from './components/collections/ObjectShow'
import Scrapbooks from './components/collections/Scrapbooks'
import ScrapbookShow from './components/collections/ScrapbookShow'
import InstitutionShowSearch from './components/collections/InstitutionShowSearch'


const App = () => {

  return (
    <div className='has-navbar-fixed-top'>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/explore'>
            <InstitutionIndex />
          </Route>
          <Route exact path='/search'>
            <InstitutionShowSearch />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/explore/:id'>
            <InstitutionShow />
          </Route>
          <Route path='/object/:id'>
            <ObjectShow />
          </Route>
          <Route exact path='/scrapbooks'>
            <Scrapbooks />
          </Route>
          <Route path='/scrapbooks/:id'>
            <ScrapbookShow />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
