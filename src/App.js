import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import firebase from 'firebase'

import { PlayerProvider } from './providers/player-provider'
import { AuthProvider } from './providers/auth-provider'
import defaultTheme from './utils/theme'

import Modal from './views/modal'
import ViewRoot from './views'

initializeFirebase()

const App = props => {
  const { className } = props

  return (
    <React.StrictMode>
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <PlayerProvider>
            <Modal>
              <ViewRoot className={className} />
            </Modal>
          </PlayerProvider>
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
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

function initializeFirebase() {
  firebase.initializeApp({
    apiKey: 'AIzaSyDXtazMnwJsEIFxF_5rvh-IO9BkWx-WCdM',
    authDomain: 'cyan-f2d39.firebaseapp.com',
    databaseURL: 'https://cyan-f2d39.firebaseio.com',
    projectId: 'cyan-f2d39',
    storageBucket: 'cyan-f2d39.appspot.com',
    messagingSenderId: '1081599922736',
    appId: '1:1081599922736:web:7213329f4cda7159fd93f5',
    measurementId: 'G-4YH9WVCN1S'
  })
}
