import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import { useAuth } from '../../hooks/auth'
import { usersCollection } from '../../utils/firebase'

import UserInfoCard from '../../components/user-info-card'

type UserDetailsProps = {
  className?: string,
}
const UserDetails = (props: UserDetailsProps) => {
  const { className } = props

  const { userInfo } = useAuth()
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null)

  useEffect(() => {
    let isMounted = true

    if (userInfo === null) {
      setUserDetail(null)
      return
    }

    const docRef = usersCollection().doc(userInfo.uid)

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          isMounted && setUserDetail(doc.data() || null)
          return
        }

        const userDetail: UserDetail = {
          phoneNumber: userInfo.phoneNumber || null,
          displayName: userInfo.displayName || null,
          photoURL: userInfo.photoURL || null,
          email: userInfo.email || null,
        }

        docRef
          .set(userDetail)
          .then(() => isMounted && setUserDetail(userDetail))
          .catch(() => isMounted && setUserDetail(null))
      })
      .catch(() => isMounted && setUserDetail(null))

      return () => { isMounted = false }
  }, [userInfo])

  const signOut = useCallback(() => { firebase.auth().signOut() }, [])

  return (
    <div className={className}>
      <UserInfoCard
        className="user-info"
        userInfo={{
          
        }}
        onSignOut={signOut}
      />
    </div>
  )
}

export default styled(UserDetails)`
  .user-info {
    margin: auto;
  }
`
