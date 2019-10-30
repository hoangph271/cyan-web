import React from 'react'
import styled from 'styled-components'

import { artistsCollection } from '../utils/firebase'

import ArtistCard from '../components/artist-card'
import SearchCollectionForm from '../components/search-collection-form'

type SearchArtistFormProps = {
  className?: string,
  resultLimit: number,
  onArtistClick: (artist: Artist) => void,
}
const SearchArtistForm = (props: SearchArtistFormProps) => {
  const { className, resultLimit, onArtistClick } = props

  return (
    <SearchCollectionForm
      sortField="title"
      className={className}
      resultLimit={resultLimit}
      firebaseCollection={artistsCollection}
      buildItems={(items: Artist[]) => (
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

type ArtistListProps = {
  className?: string,
  artists: Artist[],
  onArtistClick?: (artist: Artist) => void,
}
const ArtistList = styled((props: ArtistListProps) => {
  const { className, onArtistClick, artists } = props

  return (
    <div className={className}>
      {artists.length === 0 ? (
        <div>{`No result...! :'{`}</div>
      ) : (
        artists.map((artist: Artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            onClick={() => onArtistClick && onArtistClick(artist)}
          />
      )))}
    </div>
  )
})`
`
