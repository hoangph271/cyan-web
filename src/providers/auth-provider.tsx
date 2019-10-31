import React, { useState, useEffect, createContext, ReactNode } from 'react'
import firebase from 'firebase'

import { rolesCollection } from '../utils/firebase'

type AuthContextProps = {
  user: firebase.User | null,
  roles: string[] | null,
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const httpsCallableClaimRoles = async () => {
  await firebase
    .functions()
    .httpsCallable('claimRoles')({})

  await firebase
    .auth()
    .currentUser!.getIdToken(true)
}

type AuthProviderProps = { children?: ReactNode }
const AuthProvider = (props: AuthProviderProps = {}) => {
  const { children } = props

  const [roles, setRoles] = useState([])
  const [user, setUser] = useState(firebase.auth().currentUser)

  useEffect(() => {
    let isMounted = true

    firebase.auth()
      .onAuthStateChanged(userInfo => {

        if (userInfo === null) {
          console.info('Not logged in...!')
          return
        }

        rolesCollection()
          .doc(userInfo.uid)
          .get()
          .then(async doc => {
            if (isMounted) {
              const { isActive, roles } = doc.data() || {}
              const { claims } = await userInfo.getIdTokenResult()

              const isRolesNOTClaimed = roles && !Array.isArray(claims.roles)
              if (isRolesNOTClaimed) {
                 await httpsCallableClaimRoles()
              }

              setRoles(isActive ? roles : [])
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
      .onAuthStateChanged(userInfo => isMounted && setUser(userInfo))

    return () => { isMounted = false }
  }, [])

  return (
    <AuthContext.Provider
      value={{ roles, user }}
      children={children}
    />
  )
}

export {
  AuthContext,
  AuthProvider,
}
