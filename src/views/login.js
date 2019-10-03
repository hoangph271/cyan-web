import React, { useCallback, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import LoadingDots from '../components/loading-dots'
import FlatButton from '../components/flat-button'

const Login = (props = {}) => {
  const { className } = props
  const isMountedRef = useRef(true)
  const [signInError, setSignInError] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  useEffect(_ => _ => isMountedRef.current = false, [])

  const signIn = useCallback(async _ => {
    setIsAuthenticating(true)

    await firebase.auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(error => {
        console.error(error)
        isMountedRef.current && setSignInError(error)
      })
      .then(_ => isMountedRef.current && setIsAuthenticating(false))
  }, [])

  return (
    <div className={className}>
      {isAuthenticating ? (
        <LoadingDots />
      ) : (
        <>
          <FlatButton primary onClick={signIn}>
            {'Google Login'}
          </FlatButton>
          {signInError && (
            <div>
              {signInError.message}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default styled(Login)`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
`
