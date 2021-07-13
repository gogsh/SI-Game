import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Layout from './components/hoc/Layout/Layout'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'


function App() {
  const {token, login, logout,  userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value = {{
      login, logout, token, userId
    }}>
      <Router>
        <Layout>
          {routes}
        </Layout>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
