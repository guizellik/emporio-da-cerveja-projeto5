import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import RegisterPage from './pages/Register'
import Cart from './pages/Cart'


function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/registro" />
        </Route>
        <Route path="/registro" exact component={RegisterPage} />
        <Route path="/home" exact component={Home} />
        <Route path="/carrinho" exact component={Cart} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes