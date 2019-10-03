import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import { useInput } from '../../hooks'

import LoadingDots from '../../components/loading-dots'
import IconedInput from '../../components/iconed-input'

import noimage from '../../assets/png/no-image.png'
import search_white from '../../assets/png/search_white.png'

const SEARCH_TIMEOUT_MS = 250

const ListAll = (props = {}) => {
  const { className } = props
  const [isSearching, setIsSearching] = useState(true)
  const [keyword, onKeywordChange] = useInput('', { transformer: str => str.toLowerCase() })
  const [artists, setArtists] = useState([])

  useEffect(_ => {
    let isMounted = true

    const debounceTimeout = setTimeout(_ => {
      setIsSearching(true)

      let firestoreQuery = firebase.firestore()
        .collection('artists')
        .orderBy('title')
        .limit(3)

      if (keyword) {
        firestoreQuery = firestoreQuery.where('keywords', 'array-contains', keyword)
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
            setIsSearching(false)
          }
        })
        .catch(_ => setIsSearching(false))
    }, SEARCH_TIMEOUT_MS)

    return _ => {
      clearTimeout(debounceTimeout)
      isMounted = false
    }
  }, [keyword])

  return (
    <main className={className}>
      <IconedInput
        value={keyword}
        placeholder="Keyword"
        className="search-box"
        iconUrl={search_white}
        onChange={onKeywordChange}
      />
      {isSearching ? (
        <LoadingDots />
      ) : (
        <>
          {artists.length === 0 && <div>{`No result...! :'{`}</div>}
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
        </>
      )}
    </main>
  )
}

export default styled(ListAll)`
  .search-box {
    width: calc(100% - 1rem);
  }

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
