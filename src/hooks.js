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
    let isMounted = true

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
        if (isMounted) {
          const { isActive, roles } = doc.data() || {}

          setRoles(isActive ? roles : [])
        }
      })
      .catch(error => {
        console.error(error)
        isMounted && setRoles([])
      })

      return _ => isMounted = false
  }, [userInfo])

  return roles
}
const useAuth = _ => {
  const [userInfo, setUserInfo] = useState(null)
  const [signInError, setSignInError] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(true)

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

    return _ => isMounted = false
  }, [])
  const signOut = useCallback(_ => firebase.auth().signOut(), [])

  useEffect(_ => {
    let isMounted = true

    firebase.auth()
      .onAuthStateChanged(async userInfo => {
        if (isMounted) {
          setIsAuthenticating(false)
  
          if (userInfo !== null) {
            setSignInError(null)
            setUserInfo(userInfo)
          }
        }
      })

    return _ => isMounted = false
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
  const [userDetail, setUserDetail] = useState(null)
  const { userInfo } = authInfo

  useEffect(_ => {
    let isMounted = true

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
          isMounted && setUserDetail(doc.data())
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
          .then(_ => isMounted && setUserDetail(userDetail))
          .catch(_ => isMounted && setUserDetail(null))
      })
      .catch(_ => isMounted && setUserDetail(null))

      return _ => isMounted = false
  }, [userInfo])

  return userDetail
}

export {
  useAuth,
  useInput,
  useRoles,
  useUserDetail,
}
