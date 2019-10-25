import React from 'react'
import styled from 'styled-components'

import { useAuth } from '../hooks/auth'

import Home from './home'
import Login from './login'

const ViewRoot = (props = {}) => {
  const { className } = props

  const { userInfo } = useAuth()

  return (
    <main className={className}>
      {userInfo ? (
        <Home />
      ) : (
        <Login />
      )}
    </main>
  )
}

export default styled(ViewRoot)`
`
