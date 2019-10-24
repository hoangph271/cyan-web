import React, { useState, useContext, useCallback } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import { songsCollection } from '../utils/firestore'
import { PlayerContext } from '../utils/context'

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
      ResultList={SongList}
      resultLimit={resultLimit}
      onItemClick={handleSongClick}
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
