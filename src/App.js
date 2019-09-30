import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import './utils/init-firebase'
import { useAuth, useRoles, useUserDetail } from './hooks'
import { Roles } from './utils/constants'
import FlatButton from './components/flat-button'
import UserInfoCard from './components/user-info-card'
import CreateArtistForm from './components/create-artist-form'

const App = props => {
  const { className } = props
  const roles = useRoles()
  const [isLoading, setIsLoading] = useState(false)
  const userDetail = useUserDetail()
  const [authInfo, signIn, signOut] = useAuth()

  const onArtistSubmit = useCallback(async artist => {
    if (isLoading) return

    setIsLoading(true)

    try {
      const { title, avatar, dob, pob } = artist

      // TODO: Firestore for title...?

      await firebase
        .firestore()
        .collection('artists')
        .add({
          title,
          avatarURL: 'N/A', // FIXME: Use REAL URL
          dob,
          pob,
        }).then(result => {
          console.info(result)
          alert('DONE')
        })
    } catch (error) {
      console.error(error)
      // TODO: Handle errors here
    }

    setIsLoading(false)
  }, [isLoading])

  const { isAuthenticating, signInError } = authInfo

  if (isAuthenticating) {
    return (
      <div className={`App ${className}`}>
        <header className='App-header'>
          {'...'}
        </header>
      </div>
    )
  }

  return (
    <div className={`App ${className}`}>
      <header className='App-header'>
        {authInfo.userInfo ? (
          <UserInfoCard
            className="user-info"
            userInfo={userDetail}
            onSignOut={signOut}
          />
        ) : (
          <div>
            <FlatButton primary onClick={signIn}>
              {'Google Login'}
            </FlatButton>
            {signInError && (
              <div>
                {signInError.message}
              </div>
            )}
          </div>
        )}
      </header>
      <main style={{ width: '40rem', margin: 'auto' }}>
        {roles.includes(Roles.UPLOADER) && (
          <CreateArtistForm isLoading={isLoading} onArtistSubmit={onArtistSubmit} />
        )}
      </main>
    </div>
  )
}

export default styled(App)`
  text-align: center;

  .App-header {
    background-color: #282c34;
    font-size: calc(10px + 2vmin);
    justify-content: center;
    flex-direction: column;
    align-items: center;
    display: flex;
    color: white;
  }

  .user-info {
    width: 100%;
    margin: 0.4rem;
  }
`
