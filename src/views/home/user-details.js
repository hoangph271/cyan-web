import React, { useState, useEffect, useCallback, useContext } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import { AuthContext } from '../../context'

import UserInfoCard from '../../components/user-info-card'

const UserDetails = (props = {}) => {
  const { className } = props
  const { userInfo } = useContext(AuthContext)
  const [userDetail, setUserDetail] = useState(null)

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

  const signOut = useCallback(_ => firebase.auth().signOut(), [])

  return (
    <div className={className}>
      <UserInfoCard
        className="user-info"
        userInfo={userDetail}
        onSignOut={signOut}
      />
    </div>
  )
}

export default styled(UserDetails)`
  .user-info {
    width: calc(100% - 1rem);
    margin: auto;
  }
`