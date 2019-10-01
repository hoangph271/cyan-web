import { useState, useCallback, useEffect } from 'react'
import firebase from 'firebase'

// FIXME: Move these to Context...?
firebase
  .auth()
  .onAuthStateChanged(userInfo => {
    if (userInfo !== null) {
      firebase.functions()
      .httpsCallable('getRoleClaims')({})
      .then(_ => userInfo.getIdToken(true))
    }
  })

const useRoles = _ => {
  const [{ userInfo }] = useAuth()
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

  const signIn = useCallback(async _ => {
    setIsAuthenticating(true)

    await firebase.auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(error => {
        console.error(error)
        setIsAuthenticating(false)
        setSignInError(error)
      })
  }, [])
  const signOut = useCallback(_ => firebase.auth().signOut(), [])

  useEffect(_ => {
    firebase.auth()
      .onAuthStateChanged(async userInfo => {
        setIsAuthenticating(false)

        if (userInfo !== null) {
          setSignInError(null)
          setUserInfo(userInfo)
        }
      })
  }, [])

  const authInfo = {
    userInfo,
    signInError,
    isAuthenticating,
  }

  return [authInfo, signIn, signOut]
}
const useInput = (initValue = '') => {
  const [value, setValue] = useState(initValue)

  const handleValueChange = useCallback(e => setValue(e.target.value), [])

  return [value, handleValueChange]
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

    const docRef = firebase.firestore()
      .collection('users')
      .doc(userInfo.uid)

    docRef
      .get()
      .then(doc => {
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
          .catch(_ => setUserDetail(null))
      })
      .catch(_ => setUserDetail(null))
  }, [userInfo])

  return userDetail
}

export {
  useAuth,
  useInput,
  useRoles,
  useUserDetail,
}
