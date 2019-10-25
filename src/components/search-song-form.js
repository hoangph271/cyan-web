import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'

import { songsCollection } from '../utils/firestore'
import { PlayerContext } from '../providers/player-provider'

import Chip from './chip'
import SearchCollectionForm from './search-collection-form'

const SearchSongForm = (props = {}) => {
  const { className, resultLimit } = props
  const { onSongClick = _ => {} } = props

  return (
    <SearchCollectionForm
      sortField="title"
      className={className}
      resultLimit={resultLimit}
      firebaseCollection={songsCollection}
      buildItems={items => (
        <SongList
          songs={items}
          onSongClick={onSongClick}
        />
      )}
    />
  )
}

export default styled(SearchSongForm)`
`

// TODO: Style this
const SongList = styled((props = {}) => {
  const { className } = props
  const { songs = [], onSongClick = _ => {} } = props

  const { currentSongId, isPlaying } = useContext(PlayerContext)
  const itemClassNames = useCallback(songId => {
    const isCurrentSong = currentSongId === songId

    return (isCurrentSong ? 'current-song' : '')
      + (isCurrentSong && isPlaying ? '' : ' playing')
  }, [isPlaying, currentSongId])

  return (
    <div className={className}>
      {songs.length === 0 ? (
        <div>{`No result...! :'{`}</div>
      ) : (
        songs.map((song) => (
          <Chip
            className={itemClassNames(song.id)}
            key={song.id}
            onClick={_ => onSongClick(song)}
          >
            {`${song.title} - ${song.artists.map(artist => artist.title).join(', ')}`}
          </Chip>
      )))}
    </div>
  )
})`
  .playing-song {
    box-shadow: ${props => props.theme.deepSelectedShadow};
  }
`
