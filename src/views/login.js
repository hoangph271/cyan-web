import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import LoadingDots from '../components/loading-dots'
import FlatButton from '../components/flat-button'

const Login = (props = {}) => {
  const { className } = props
  const [signInError, setSignInError] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const signIn = useCallback(async _ => {
    let isMounted = true

    setIsAuthenticating(true)

    await firebase.auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(error => {
        console.error(error)
        isMounted && setIsAuthenticating(false)
        isMounted && setSignInError(error)
      })
      .then(_ => isMounted && setIsAuthenticating(false))

    return _ => isMounted = false
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
