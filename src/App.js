import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import './utils/init-firebase'
import { useAuth, useRoles, useUserDetail, useIsMounted } from './hooks'
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

const AuthInfo = (props = {}) => {
  const { className } = props || {}
  const [authInfo, signIn, signOut] = useAuth()
  const userDetail = useUserDetail()
  const { signInError, isAuthenticating, userInfo } = authInfo

  if (isAuthenticating) {
    return <LoadingApp className={className} />
  }

  return (
    <main className={className}>
      {userInfo ? (
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

const CreateArtist = (props = {}) => {
  const { className } = props
  const roles = useRoles()
  const isMounted = useIsMounted()
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

    console.info(isMounted)
    isMounted && setIsLoading(false)
  }, [isLoading, isMounted])

  return (
  <main className={className} style={{ width: '40rem', maxWidth: 'calc(100% - 1rem)', margin: 'auto' }}>
    {roles.includes(Roles.UPLOADER) && (
      <CreateArtistForm isLoading={isLoading} onArtistSubmit={onArtistSubmit} />
    )}
  </main>
  )
}

const ListAll = (props = {}) => {
  const { className } = props
  const isMounted = useIsMounted()
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

        isMounted && setArtists(artists)
      })
  }, [isMounted])
  
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

const TabView = (props = {}) => {
  const { className, headers = [], children = [] } = props
  const [viewIndex, setViewIndex] = useState(0)

  if (headers.length !== children.length) {
    throw new Error(`Number of headers and children must be equal...! :'/`)
  }

  return (
    <section className={className}>
      <nav>
        <ul>
          {headers.map((header, i) => (
            <li
              style={{
                cursor: i === viewIndex ? 'default' : 'pointer',
                fontWeight: i === viewIndex && 'bold',
              }}
              key={`${header}-${i}`}
              onClick={_ => setViewIndex(i)}
            >
              {header}
            </li>
          ))}
        </ul>
      </nav>
      {children.find((_, i) => i === viewIndex)}
    </section>
  )
}

const App = props => {
  const { className } = props

  return (
    <TabView headers={['Auth', 'CreateArtist', 'ListAll']} className={`App ${className}`}>
      <AuthInfo />
      <CreateArtist />
      <ListAll />
    </TabView>
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
