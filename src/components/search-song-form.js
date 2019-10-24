import React from 'react'
import styled from 'styled-components'

import { songsCollection } from '../utils/firestore'

import SearchCollectionForm from './search-collection-form'

const SearchSongForm = (props = {}) => {
  const { className, resultLimit } = props
  const { onArtistClick = _ => {} } = props

  return (
    <SearchCollectionForm
      sortField="title"
      className={className}
      ResultList={SongList}
      resultLimit={resultLimit}
      onItemClick={onArtistClick}
      firebaseCollection={songsCollection}
    />
  )
}

export default styled(SearchSongForm)`
`

// TODO: Style this
const SongList = styled((props = {}) => {
  const { className } = props
  const { items: songs = [], onItemClick = _ => {} } = props

  return (
    <div className={className}>
      {songs.length === 0 ? (
        <div>{`No result...! :'{`}</div>
      ) : (
        songs.map((song) => (
          <div
            key={song.id}
            onClick={_ => onItemClick(song)}
          >
            {`${song.title} - ${song.artists.map(artist => artist.title).join(', ')}`}
          </div>
      )))}
    </div>
  )
})`
`
