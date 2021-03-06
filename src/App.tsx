import React, { ReactNode } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import { PlayerProvider } from './providers/player-provider'
import { AuthProvider } from './providers/auth-provider'
import { ModalProvider } from './providers/modal-provider'
import defaultTheme from './utils/theme'

import { initializeFirebase } from './utils/firebase'

import ViewRoot from './views'

initializeFirebase()

type CombinedAppContexts = { children?: ReactNode }
const CombinedAppContexts = (props: CombinedAppContexts = {}) => (
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <PlayerProvider>
              <ModalProvider>
                {props.children}
              </ModalProvider>
          </PlayerProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
)

type AppProps = { className?: string };
const App = (props: AppProps = {}) => {
  const { className } = props

  return (
    <CombinedAppContexts>
      <ViewRoot className={className} />
    </CombinedAppContexts>
  )
}

export default styled(App)`
  font-size: calc(10px + 2vmin);
  background-color: #ecf0f1;
  text-align: center;
  min-height: 100vh;
  display: flex;
  color: #2c3e50;

  .fullscreen-dialog {
    position: absolute;
    bottom: 0;
    top: 0;
  }
`
