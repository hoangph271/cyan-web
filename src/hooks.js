import { useState, useCallback, useEffect } from 'react'
import firebase from 'firebase'

const useAuth = _ => {
  const [userInfo, setUserInfo] = useState(null)
  const [signInError, setSignInError] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  const signIn = useCallback(_ => {
    setIsAuthenticating(true)

    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth()
      .signInWithPopup(provider)
      .catch(error => {
        setIsAuthenticating(false)
        setSignInError(error)
      })
  }, [])
  const signOut = useCallback(_ => firebase.auth().signOut(), [])

  useEffect(_ => {
    firebase
      .auth()
      .onAuthStateChanged(userInfo => {
        setIsAuthenticating(false)
        setUserInfo(userInfo)
      })
  }, [])

  const authInfo = {
    userInfo,
    signInError,
    isAuthenticating,
  }

  return [authInfo, signIn, signOut]
}

export {
  useAuth,
}
