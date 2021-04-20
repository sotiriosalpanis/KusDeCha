import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import InstitutionIndex from './components/Collections/InstitutionIndex'
import InstitutionShow from './components/Collections/InstitutionShow'
import Login from './Auth/Login'
import Register from './Auth/Register'
import ObjectShow from './components/Collections/ObjectShow'
import Scrapbooks from './components/Collections/Scrapbooks'
import ScrapbookShow from './components/Collections/ScrapbookShow'


const App = () => {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/explore'>
            <InstitutionIndex />
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
    </>
  )
}

export default App
