import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import { useInput } from '../../hooks'

import noimage from '../../assets/png/no-image.png'

const ListAll = (props = {}) => {
  const { className } = props
  const [keyword, onKeywordChange] = useInput('', { transformer: keyword => keyword.toLowerCase() })
  const [submitKeyword, setSubmitKeyword] = useState('')
  const [artists, setArtists] = useState([])

  useEffect(_ => {
    let isMounted = true

    let firestoreQuery = firebase.firestore()
      .collection('artists')
      .orderBy('title')
      .limit(3)

    if (submitKeyword) {
      firestoreQuery = firestoreQuery.where('keywords', 'array-contains', submitKeyword.toLowerCase())
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

  const handleSearchClick = e => {
    e.preventDefault()
    setSubmitKeyword(keyword)
  }

  return (
    <main className={className}>
      <form>
        <input value={keyword} onChange={onKeywordChange} />
        <button onClick={handleSearchClick}>
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
}

export default styled(ListAll)`
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
