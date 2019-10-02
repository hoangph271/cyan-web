import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import './utils/init-firebase'
import { useAuth, useRoles, useUserDetail } from './hooks'
import { Roles } from './utils/constants'
import FlatButton from './components/flat-button'
import UserInfoCard from './components/user-info-card'
import CreateArtistForm from './components/create-artist-form'

const LoadingApp = ({ className }) => (
  <div className={`App ${className}`}>
    <header className='App-header'>
      {'...'}
    </header>
  </div>
)

const Auth = props => {
  const { className } = props || {}
  const [authInfo, signIn, signOut] = useAuth()
  const { signInError } = authInfo
  const userDetail = useUserDetail()

  return (
    <main className={className}>
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
    </main>
  )
}

const CreateArtist = props => {
  const { className } = props
  const roles = useRoles()
  const [isLoading, setIsLoading] = useState(false)

  const onArtistSubmit = useCallback(async artist => {
    if (isLoading) return

    setIsLoading(true)

    try {
      const { title, avatar, dob, pob } = artist

      // TODO: Add keywords here...!
      const docRef = firebase.firestore()
        .collection('artists')
        .doc()

      const avatarURL = avatar
        ? await firebase.storage()
          .ref(`artists/${docRef.id}`)
          .put(avatar)
          .then(snapshot => snapshot.ref.getDownloadURL())
        : null

      await docRef.set({ title, avatarURL, dob, pob })
    } catch (error) {
      console.error(error)
      // TODO: Handle errors here
    }

    setIsLoading(false)
  }, [isLoading])

  return (
  <main className={className} style={{ width: '40rem', margin: 'auto' }}>
    {roles.includes(Roles.UPLOADER) && (
      <CreateArtistForm isLoading={isLoading} onArtistSubmit={onArtistSubmit} />
    )}
  </main>
  )
}

const ListAll = props => {
  const { className } = props
  const [artists, setArtists] = useState([])

  useEffect(_ => {
    firebase.firestore()
      .collection('artists')
      .orderBy('title')
      .limit(3)
      .get()
      .then(snapshot => {
        const artists = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setArtists(artists)
      })
  }, [])
  
  return (
    <div className={className}>
      {artists.map(artist => (
        <div key={artist.id} style={{ height: '60px', display: 'flex' }}>
          {artist.avatarURL && <img src={artist.avatarURL} alt={artist.title} style={{ height: '100%' }} />}
          <div>{artist.title}</div>
        </div>
      ))}
    </div>
  )
}

const Views = {
  Auth,
  CreateArtist,
  ListAll,
}

const App = props => {
  const { className } = props
  const [authInfo] = useAuth()
  const [CurrentView, setCurrentView] = useState(Views.Auth)
  const { isAuthenticating } = authInfo

  return isAuthenticating ? (
    <LoadingApp className={className} />
  ) : (
    <div className={`App ${className}`}>
      <nav>
        <ul>
          <li onClick={_ => setCurrentView(Views.Auth)}>{'Auth'}</li>
          <li onClick={_ => setCurrentView(Views.CreateArtist)}>{'Create'}</li>
          <li onClick={_ => setCurrentView(Views.ListAll)}>{'List'}</li>
        </ul>
      </nav>
      <CurrentView className="" />
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
