import React, { useState, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import './utils/init-firebase'
import { useAuth, useRoles, useUserDetail, useInput } from './hooks'
import { generateKeywords } from './utils/text'
import { Roles } from './utils/constants'
import FlatButton from './components/flat-button'
import UserInfoCard from './components/user-info-card'
import CreateArtistForm from './components/create-artist-form'
import noimage from './assets/png/no-image.png'

const LoadingApp = ({ className }) => {
  return (
    <div className={`App ${className}`}>
      <header className='App-header'>
        {'...'}
      </header>
    </div>
  )
}

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
  const [isLoading, setIsLoading] = useState(false)

  const onArtistSubmit = useCallback(async artist => {
    if (isLoading) return

    setIsLoading(true)

    try {
      const { title, avatar, dob, pob } = artist
      const keywords = generateKeywords(title)

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

      await docRef.set({ title, keywords, avatarURL, dob, pob })
    } catch (error) {
      console.error(error)
      // TODO: Handle errors here
    }

    setIsLoading(false)
  }, [isLoading])

  return (
    <main className={className} style={{ width: '40rem', maxWidth: 'calc(100% - 1rem)', margin: 'auto' }}>
    {roles.includes(Roles.UPLOADER) && (
      <CreateArtistForm isLoading={isLoading} onArtistSubmit={onArtistSubmit} />
    )}
  </main>
  )
}

const ListAll = styled((props = {}) => {
  const { className } = props
  const [keyword, onKeywordChange] = useInput('')
  const [submitKeyword, setSubmitKeyword] = useState('')
  const [artists, setArtists] = useState([])

  useEffect(_ => {
    let isMounted = true

    let firestoreQuery = firebase.firestore()
      .collection('artists')
      .orderBy('title')
      .limit(3)

    if (submitKeyword) {
      firestoreQuery = firestoreQuery.where('keywords', 'array-contains', submitKeyword)
    }

    firestoreQuery
      .get()
      .then(snapshot => {
        if (isMounted) {
          const artists = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))

          setArtists(artists)
        }
      })

    return _ => isMounted = false
  }, [submitKeyword])

  const onSearchClick = e => {
    e.preventDefault()
    setSubmitKeyword(keyword)
  }

  return (
    <main className={className}>
      <form>
        <input value={keyword} onChange={onKeywordChange} />
        <button onClick={onSearchClick}>
          {'Search'}
        </button>
      </form>
      {artists.map(({ avatarURL, title, id }) => (
        <div key={id} className="artist-card">
          <div
            className={`avatar ${avatarURL ? '' : 'no-avatar'}`}
            style={{
              backgroundImage: `url(${avatarURL || noimage})`
            }}
          />
          <div>{title}</div>
        </div>
      ))}
    </main>
  )
})`
  .artist-card {
    height: 6rem;
    display: flex;

    .avatar {
      min-width: 30%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .no-avatar {
      background-size: contain;
    }
  }
`

const TabView = styled((props = {}) => {
  const { className, selected = 0, headers = [], children = [] } = props
  const [viewIndex, setViewIndex] = useState(selected)
  const tabView = useRef(null)

  if (headers.length !== children.length) {
    throw new Error(`Number of headers and children must be equal...! :'/`)
  }

  const onKeyDown = useCallback(e => {
    const keyNumber = Number(e.key)

    if (0 < keyNumber && keyNumber < headers.length + 1) {
      setViewIndex(keyNumber - 1)
    }
  }, [headers])

  useEffect(_ => {
    document.addEventListener('keydown', onKeyDown)
    return _ => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <section className={className} ref={tabView}>
      <nav>
        <ul className="tabview-nav">
          {headers.map((header, i) => (
            <li
              className="nav-item"
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
})`
  .tabview-nav {
    display: flex;
    justify-content: space-around;

    .nav-item {
      list-style: none;
    }
  }
`

const App = props => {
  const { className } = props

  return (
    <TabView
      headers={['Auth', 'CreateArtist', 'ListAll']}
      className={`App ${className}`}
      selected={2}
    >
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
