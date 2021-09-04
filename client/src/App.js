import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Layout from './components/hoc/Layout/Layout'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { TimerContext } from './context/TimerContext'


function App() {
  const { token, login, logout, userId, nickname, avatarLink } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, nickname, avatarLink
    }}>
      <TimerContext.Provider value={{
        'choose-who-start': 10000,
        'showing-round': 3000,
        'showing-themes': 8000,
      }}>
        <Router>
          <Layout>
            {routes}
          </Layout>
        </Router>
      </TimerContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
