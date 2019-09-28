import { useState, useCallback, useEffect } from 'react'
import firebase from 'firebase'

const useRoles = _ => {
  const [authInfo] = useAuth()
  const { userInfo } = authInfo
  const [roles, setRoles] = useState([])

  useEffect(_ => {
    if (userInfo === null) {
      setRoles([])
      return
    }

    const docRef = firebase
      .firestore()
      .collection('roles')
      .doc(userInfo.uid)

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const { isActive, roles } = doc.data()

          isActive ? setRoles(roles) : setRoles([])
          return
        }

        setRoles([])
      })
      .catch(error => {
        console.error(error)
        setRoles([])
      })
  }, [userInfo])

  return roles
}
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
        console.error(error)
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
  const roles = useRoles()
  const [authInfo] = useAuth()
  const { userInfo } = authInfo
  const [userDetail, setUserDetail] = useState(null)

  useEffect(_ => {
    setUserDetail(prevState => ({
      ...prevState,
      roles,
    }))
  }, [roles])

  useEffect(_ => {
    if (userInfo === null) {
      setUserDetail(null)
      return
    }

    const docRef = firebase
      .firestore()
      .collection('users')
      .doc(userInfo.uid)

    docRef
      .get()
      .then(doc => {
          if (doc.exists) {
          setUserDetail(prevState => ({
            roles: prevState.roles,
            uid: userInfo.uid,
            ...doc.data(),
          }))
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
          .then(_ => {
            setUserDetail(prevState => ({
              roles: prevState.roles,
              uid: userInfo.uid,
              ...userDetail,
            }))
          })
          .catch(_ => setUserDetail(null))
      })
      .catch(_ => setUserDetail(null))
  }, [userInfo])

  return userDetail
}

export {
  useAuth,
  useUserDetail,
}
