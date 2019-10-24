import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import App from './App'
import * as serviceWorker from './serviceWorker'

const StyledApp = styled(App)`
  @import url('https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap');

  * {
    font-family: 'Patrick Hand', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    margin: 0;
    font-size: 16px;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`

ReactDOM.render(<StyledApp />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
