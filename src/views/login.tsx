import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import firebase from 'firebase'

import { useAuth } from '../hooks/auth'

import ZenCircle from '../components/zen-circle'
import FlatButton from '../components/flat-button'

type LoginProps = { className?: string }
const Login = (props: LoginProps = {}) => {
  const { className } = props

  const { userInfo } = useAuth()
  const isMountedRef = useRef(true)
  const [signInError, setSignInError] = useState<Error | null>(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const { from } = useLocation().state || { from: { pathname: '/' }}

  useEffect(() => () => { isMountedRef.current = false }, [])

  const signIn = useCallback(() => {
    setIsAuthenticating(true)

    firebase.auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(error => {
        console.error(error)
        isMountedRef.current && setSignInError(error)
      })
      .then(_ => isMountedRef.current && setIsAuthenticating(false))
  }, [])

  if (userInfo) {
    
  }

  return userInfo ? (
    <Redirect to={from.pathname} />
  ) : (
    <div className={className}>
      {isAuthenticating ? (
        <ZenCircle text="Authenticating...!" />
      ) : (
        <div className="login-zone">
          <FlatButton primary onClick={signIn}>
            {'Google Login'}
          </FlatButton>
          {signInError && (
            <div>
              {signInError.message}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default styled(Login)`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;

  .login-zone {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
`
