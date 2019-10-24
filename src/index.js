import React from 'react'
import ReactDOM from 'react-dom'

import App, { Modal } from './App'
import * as serviceWorker from './serviceWorker'
import { GlobalStyle } from './utils/constants'

ReactDOM.render((
  <>
    <GlobalStyle />
    <App />
  </>
), document.getElementById('root'))

ReactDOM.render(<Modal />, document.getElementById('modal-root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
