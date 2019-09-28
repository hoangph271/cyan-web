import { useState, useCallback, useEffect } from 'react'
import firebase from 'firebase'

const useAuth = _ => {
  const [userInfo, setUserInfo] = useState(null)
  const [signInError, setSignInError] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  const signIn = useCallback(_ => {
    setIsAuthenticating(true)

    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
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
        setSignInError(null)
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
const useUserDetail = _ => {
  const [authInfo] = useAuth()
  const { userInfo } = authInfo
  const [userDetail, setUserDetail] = useState(null)

  useEffect(_ => {
    if (userInfo === null) {
      setUserDetail(null)
      return
    }

    const docRef = firebase
      .firestore()
      .collection('users')
      .doc(userInfo.uid)

    docRef.get().then(doc => {
      if (doc.exists) {
        setUserDetail(doc.data())
        return
      }

      const userDetail = {
        phoneNumber: userInfo.phoneNumber || null,
        displayName: userInfo.displayName || null,
        photoURL: userInfo.photoURL || null,
        email: userInfo.email || null,
      }

      docRef
        .set(userDetail)
        .then(_ => setUserDetail(userDetail))
    })
  }, [userInfo])

  return userDetail
}

export {
  useAuth,
  useUserDetail,
}
