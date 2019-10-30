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

  const { user } = useAuth()
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null)

  useEffect(() => {
    let isMounted = true

    if (user === null) {
      setUserDetail(null)
      return
    }

    const docRef = usersCollection().doc(user.uid)

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          isMounted && setUserDetail(doc.data() || null)
          return
        }

        const userDetail: UserDetail = {
          phoneNumber: user.phoneNumber || null,
          displayName: user.displayName || null,
          photoURL: user.photoURL || null,
          email: user.email || null,
        }

        docRef
          .set(userDetail)
          .then(() => isMounted && setUserDetail(userDetail))
          .catch(() => isMounted && setUserDetail(null))
      })
      .catch(() => isMounted && setUserDetail(null))

      return () => { isMounted = false }
  }, [user])

  const signOut = useCallback(() => { firebase.auth().signOut() }, [])

  return (
    <div className={className}>
      <UserInfoCard
        className="user-info"
        userDetail={userDetail}
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
