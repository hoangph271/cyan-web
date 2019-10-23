import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { useInput } from '../utils/hooks'
import { artistsCollection } from '../utils/firestore'

import ZenCircle from '../components/zen-circle'
import IconedInput from '../components/iconed-input'
import ArtistCard from '../components/artist-card'

import search_white from '../assets/png/search_white.png'

const RESULT_COUNT_LIMIT = 10
const SEARCH_TIMEOUT_MS = 250

const SearchArtistForm = (props = {}) => {
  const { className, resultLimit = RESULT_COUNT_LIMIT } = props
  const { onArtistClick = _ => {} } = props

  const [isSearching, setIsSearching] = useState(true)
  const [keyword, onKeywordChange] = useInput('', { transformer: str => str.toLowerCase() })
  const [artists, setArtists] = useState([])

  useEffect(_ => {
    let isMounted = true

    const debounceTimeout = setTimeout(_ => {
      setIsSearching(true)

      let firestoreQuery = artistsCollection()
        .orderBy('title')
        .limit(resultLimit)

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
  }, [keyword, resultLimit])

  return (
    <div className={className}>
      <IconedInput
        value={keyword}
        placeholder="Keyword"
        className="search-box"
        iconUrl={search_white}
        onChange={onKeywordChange}
      />
      {isSearching ? (
        <ZenCircle />
      ) : (
        <div>
          {artists.length === 0 ? (
            <div>{`No result...! :'{`}</div>
          ) : (
            artists.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onClick={_ => onArtistClick(artist)}
              />
          )))}
        </div>
      )}
    </div>
  )
}

export default styled(SearchArtistForm)`
`
