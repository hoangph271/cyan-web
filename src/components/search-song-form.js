import React, { useState, useContext, useCallback } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import { songsCollection } from '../utils/firestore'
import { PlayerContext } from '../utils/context'

import Chip from './chip'
import SearchCollectionForm from './search-collection-form'

const SearchSongForm = (props = {}) => {
  const { className, resultLimit } = props
  const { playAudio, toggleAudio } = useContext(PlayerContext)
  const [playingSong, setPlayingSong] = useState(null)

  const handleSongClick = useCallback(song => {
    if (playingSong && playingSong.id === song.id) {
      toggleAudio()
    } else {
      setPlayingSong(song)

      firebase
        .storage()
        .ref(`songs/${song.id}`)
        .getDownloadURL()
        .then(url => playAudio(url))
    }
  }, [playAudio, playingSong, toggleAudio])

  return (
    <SearchCollectionForm
      sortField="title"
      className={className}
      resultLimit={resultLimit}
      firebaseCollection={songsCollection}
      buildItems={items => (
        <SongList
          songs={items}
          onSongClick={handleSongClick}
          playingSongId={playingSong && playingSong.id}
        />
      )}
    />
  )
}

export default styled(SearchSongForm)`
`

// TODO: Style this
const SongList = styled((props = {}) => {
  const { className, playingSongId } = props
  const { songs = [], onSongClick = _ => {} } = props

  return (
    <div className={className}>
      {songs.length === 0 ? (
        <div>{`No result...! :'{`}</div>
      ) : (
        songs.map((song) => (
          <Chip
            className={`${playingSongId === song.id ? 'playing-song' : ''}`}
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
