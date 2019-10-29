import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'

import { useAuth } from '../hooks/auth'

import CenterText from '../components/center-text'

import UploaderHome from './uploader-home'
import MemberHome from './member-home'
import Login from './login'

type AuthRequiredRoute = { children?: ReactElement, path?: string, exact?: boolean }
const AuthRequiredRoute = (props: AuthRequiredRoute = {}) => {
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

type ViewRootProps = { className?: string }
const ViewRoot = (props: ViewRootProps = {}) => {
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
