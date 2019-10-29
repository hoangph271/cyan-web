import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import { PlayerProvider } from './providers/player-provider'
import { AuthProvider } from './providers/auth-provider'
import defaultTheme from './utils/theme'

import { initializeFirebase } from './utils/firebase'

import Modal from './views/modal'
import ViewRoot from './views'

initializeFirebase()

const CombinedAppContexts = (props = {}) => (
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <PlayerProvider>
              <Modal>
                {props.children}
              </Modal>
          </PlayerProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
)

const App = props => {
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
