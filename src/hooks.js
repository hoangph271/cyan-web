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
  const [userDetail, setUserDetail] = useState(null)

  const { userInfo } = authInfo

  useEffect(_ => {
    if (userInfo === null) return

    const docRef = firebase
      .firestore()
      .collection('users')
      .doc(userInfo.uid)

    docRef.get().then(doc => {
      if (doc.exists) {
        console.info('user detail OK')
        setUserDetail(doc.data())
        return
      }

      
      console.info('Bad user detail')
      const userDetail = {
        phoneNumber: userInfo.phoneNumber || null,
        fullName: userInfo.fullName || null,
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
