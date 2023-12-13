import React from 'react'
import { Game } from 'pages'
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'
import { AppProvider } from 'utils/context/AppContext'
import { DefaultLayout } from 'layouts'

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Game />} />
          </Route>
        </Switch>
      </BrowserRouter>
    </AppProvider>
  )
}
