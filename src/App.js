import React, { useState, useEffect, useRef, useCallback } from 'react'
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

const BoldDialog = styled(React.forwardRef((props = {}, forwardedRef) => {
  const {
    children,
    className,
    title = 'Dialog',
    onClose = _ => {},
    onConfirm = _ => {}, } = props

  return (
    <dialog className={className} ref={forwardedRef}>
      <header className="dialog-header">
        <span className="dialog-title">
          {title}
        </span>
        <button
          className="dialog-close"
          onClick={onClose}
        >
          {'✖'}
        </button>
      </header>
      {children}
    </dialog>
  )
}))`
  padding: 0.2rem;

  &::backdrop {
    background-color: rgba(45, 52, 54, 0.6);
  }

  .dialog-header {
    background-color: #fdcb6e;
    border: 2px solid #e17055;
    border-radius: 0.2rem;
    display: flex;

    .dialog-title {
      flex-grow: 1;
      cursor: default;
      padding-top: 0.1rem;
      padding-bottom: 0.1rem;
    }
    .dialog-close {
      border: none;
      cursor: pointer;
      background: none;
      border-left: 2px solid #e17055;
    }
    .dialog-close:hover {
      background-color: #e17055;
    }
  }
`

const App = props => {
  const { className } = props
  const roles = useRoles()
  const userInfo = useUserInfo()
  const dialogRef = useRef(null)
  const [fullscreenDialog, setFullscreenDialog] = useState(null)

  const handleCloseDialog = useCallback(_ => setFullscreenDialog(null), [setFullscreenDialog])

  useEffect(_ => {
    setTimeout(_ => {
      setFullscreenDialog({
        content: (
          <div>
            {'It has something in it...! :"}'}
          </div>
        ),
      })

      dialogRef.current.showModal()
    }, 1000 * 0)
  }, [])

  return (
    <AuthContext.Provider value={{ userInfo, roles }}>
      <main className={className} >
        {fullscreenDialog && (
          <BoldDialog
            className="fullscreen-dialog"
            onClose={handleCloseDialog}
            ref={dialogRef}
          >
            {fullscreenDialog.content}
          </BoldDialog>
        )}
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

  .fullscreen-dialog {
    position: absolute;
    bottom: 0;
    top: 0;
  }
`
