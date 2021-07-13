import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Auth from './components/pages/Auth/Auth'
import PlayingRoom from './components/pages/PlayingRoom/PlayingRoom'
import Editor from './components/pages/Editor/Editor'
import Main from './components/pages/Main/Main'



export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>

      <Route path='/main' exact>
        <Main />
      </Route>

      <Route path='/editor' exact>
        <Editor />
      </Route>

      <Route path='/playingRoom/:id' exact>
        <PlayingRoom />
      </Route>

      <Redirect to='/main' />

    </Switch>
      
    )
  }
  return (
    <Switch>

        <Route path='/' exact >
          <Auth />
        </Route>

        <Redirect to='/' />
      </Switch>
  )
}