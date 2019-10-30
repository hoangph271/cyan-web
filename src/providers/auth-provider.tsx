import React, { useState, useEffect, createContext } from 'react'
import firebase from 'firebase'

import { rolesCollection } from '../utils/firebase'

type AuthContextProps = {
  userInfo: UserInfo | null,
  roles: Array<string> | null
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

type AuthProviderProps = { children?: React.ReactNode }
const AuthProvider = (props: AuthProviderProps = {}) => {
  const { children } = props

  const [roles, setRoles] = useState([])
  const [userInfo, setUserInfo] = useState(firebase.auth().currentUser)

  useEffect(() => {
    let isMounted = true

    firebase.auth()
      .onAuthStateChanged(userInfo => {
      if (userInfo === null) {
        isMounted && setRoles([])
        return
      }

      rolesCollection()
        .doc(userInfo.uid)
        .get()
        .then(doc => {
          if (isMounted) {
            const { isActive, roles } = doc.data() || {}

            setRoles(isActive ? roles : [])

            if (Array.isArray(roles)) {
              firebase.functions()
                .httpsCallable('claimRoles')({})
                .then(_ => userInfo.getIdToken(true))
            }
          }
        })
        .catch(error => {
          console.error(error)
          isMounted && setRoles([])
        })
      })

      return () => { isMounted = false }
  }, [])
  useEffect(() => {
    let isMounted = true

    firebase
      .auth()
      .onAuthStateChanged(userInfo => isMounted && setUserInfo(userInfo))

    return () => { isMounted = false }
  }, [])

  return (
    <AuthContext.Provider
      value={{ roles, userInfo }}
      children={children}
    />
  )
}

export {
  AuthContext,
  AuthProvider,
}
