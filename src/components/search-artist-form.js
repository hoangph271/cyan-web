import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

import { useInput } from '../utils/hooks'
import { artistsCollection } from '../utils/firestore'

import SearchBox from '../components/search-box'
import ZenCircle from '../components/zen-circle'
import ArtistCard from '../components/artist-card'

const RESULT_COUNT_LIMIT = 10

const SearchArtistForm = (props = {}) => {
  const { className, resultLimit = RESULT_COUNT_LIMIT } = props
  const { onArtistClick = _ => {} } = props

  const [isSearching, setIsSearching] = useState(true)
  const [keyword, , setKeyword] = useInput('', { transformer: str => str.toLowerCase() })
  const [artists, setArtists] = useState([])

  const handleArtistSearch = useCallback(keyword => setKeyword(keyword), [setKeyword])

  useEffect(_ => {
    let isMounted = true
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

    return _ => isMounted = false
  }, [keyword, resultLimit])

  return (
    <div className={className}>
      <SearchBox
        onSearch={handleArtistSearch}
      />
      {isSearching ? (
        <ZenCircle />
      ) : (
        <ArtistList artists={artists} onArtistClick={onArtistClick} />
      )}
    </div>
  )
}

export default styled(SearchArtistForm)`
`

const ArtistList = styled((props = {}) => {
  const { className } = props
  const { artists = [], onArtistClick = _ => {} } = props

  return (
    <div className={className}>
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
  )
})`
`
