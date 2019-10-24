import { createGlobalStyle } from 'styled-components'

const Roles = {
  UPLOADER: 'uploader',
}
Object.freeze(Roles)

const MinWidths = {
  SMALL: '(min-width: 576px)',
  MEDIUM: '(min-width: 768px)',
  LARGE: '(min-width: 992px)',
  EXTRA: '(min-width: 1200px)',
}
Object.freeze(MinWidths)

const GlobalStyle = createGlobalStyle`
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

export {
  Roles,
  MinWidths,
  GlobalStyle,
}
