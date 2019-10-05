import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import { AuthContext } from './context'
import { rolesCollection } from './utils/firestore'

import Home from './views/home'
import Login from './views/login'

firebase.initializeApp({
  apiKey: 'AIzaSyDXtazMnwJsEIFxF_5rvh-IO9BkWx-WCdM',
  authDomain: 'cyan-f2d39.firebaseapp.com',
  databaseURL: 'https://cyan-f2d39.firebaseio.com',
  projectId: 'cyan-f2d39',
  storageBucket: 'cyan-f2d39.appspot.com',
  messagingSenderId: '1081599922736',
  appId: '1:1081599922736:web:7213329f4cda7159fd93f5',
  measurementId: 'G-4YH9WVCN1S'
})

const useRoles = _ => {
  const [roles, setRoles] = useState(null)

  useEffect(_ => {
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

      return _ => isMounted = false
  }, [])

  return roles
}
const useUserInfo = _ => {
  const [userInfo, setUserInfo] = useState(firebase.auth().currentUser)

  useEffect(_ => {
    let isMounted = true

    firebase.auth()
      .onAuthStateChanged(userInfo => {
        isMounted && setUserInfo(userInfo)
      })

    return _ => isMounted = false
  }, [])

  return userInfo
}

const App = props => {
  const { className } = props
  const roles = useRoles()
  const userInfo = useUserInfo()

  return (
    <AuthContext.Provider value={{ userInfo, roles }}>
      <main className={className} >
        {userInfo ? (
          <Home />
        ) : (
          <Login />
        )}
      </main>
    </AuthContext.Provider>
  )
}

export default styled(App)`
  font-size: calc(10px + 2vmin);
  background-color: #ecf0f1;
  text-align: center;
  min-height: 100vh;
  display: flex;
  color: #2c3e50;
`
