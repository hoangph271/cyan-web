import React from 'react'
import styled from 'styled-components'

import { artistsCollection } from '../utils/firestore'

import ArtistCard from '../components/artist-card'
import SearchCollectionForm from '../components/search-collection-form'

const SearchArtistForm = (props = {}) => {
  const { className, resultLimit } = props
  const { onArtistClick = _ => {} } = props

  return (
    <SearchCollectionForm
      sortField="title"
      className={className}
      resultLimit={resultLimit}
      firebaseCollection={artistsCollection}
      buildItems={items => (
        <ArtistList
          artists={items}
          onArtistClick={onArtistClick}
        />
      )}
    />
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
