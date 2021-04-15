import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/Navbar'
import InstitutionIndex from './components/Collections/InstitutionIndex'
import InstitutionShow from './components/Collections/InstitutionShow'


const App = () => {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/institutions/:id'>
            <InstitutionShow />
          </Route>
          <Route exact path='/institutions'>
            <InstitutionIndex />
          </Route>

        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
