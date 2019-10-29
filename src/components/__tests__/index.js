import React from 'react'
import { ThemeProvider } from 'styled-components'
import defaultTheme from '../../utils/theme'

const withDefaultTheme = children => (
  <ThemeProvider theme={defaultTheme}>
    {children}
  </ThemeProvider>
)

export {
  withDefaultTheme,
}
