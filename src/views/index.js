import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'

import { useAuth } from '../hooks/auth'

import CenterText from '../components/center-text'

import UploaderHome from './uploader-home'
import MemberHome from './member-home'
import Login from './login'

const AuthRequiredRoute = (props = {}) => {
  const { userInfo } = useAuth()
  const location = useLocation()

  return (
    <Route {...props}>
      {userInfo ? props.children : (
        <Redirect to={{
          pathname: '/login',
          state: { from: location },
        }} />
      )}
    </Route>
  )
}

const ViewRoot = (props = {}) => {
  const { className } = props

  return (
    <main className={className}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <AuthRequiredRoute path="/uploader">
          <UploaderHome />
        </AuthRequiredRoute>
        <AuthRequiredRoute exact path="/">
          <MemberHome />
        </AuthRequiredRoute>
        <Route>
          <CenterText text="404 | Not Found" />
        </Route>
      </Switch>
    </main>
  )
}

export default styled(ViewRoot)`
`
