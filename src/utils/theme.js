import React from 'react'
import { ThemeProvider } from 'styled-components'

const defaultTheme = {
  // * COLOR
  mainColor: '#000',
  // * RADIUS
  shalowRadius: '0.2rem',
  deepRadius: '0.4rem',
  // * SHADOW
  shallowShadow: '0 0 2px #555',
  shallowSelectedShadow: '0 0 2px #00b894',
  insetShadow: 'inset 0 0 4px #333',
  deepShadow: '0 0 4px #333',
  deepCurrentShadow: '0 0 4px #e17055',
  deepSelectedShadow: '0 0 4px #00b894',
  // * MARGIN
  shallowMargin: '0.4rem',
  deepMargin: '1.0rem',
  // * PADDING
  shallowPadding: '0.4rem',
  deepPadding: '1.0rem',
}

export default defaultTheme

const withDefaultTheme = children => (
  <ThemeProvider theme={defaultTheme}>
    {children}
  </ThemeProvider>
)

export {
  withDefaultTheme,
}