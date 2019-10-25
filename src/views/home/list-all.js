import React, { useContext } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import { PlayerContext } from '../../providers/player-provider'

import SearchSongForm from '../../components/search-song-form'

const ListAll = (props = {}) => {
  const { className } = props

  const { currentSongId, playSong, togglePlay } = useContext(PlayerContext)

  const handleSongClick = song => {
    currentSongId === song.id
      ? togglePlay()
      : firebase
        .storage()
        .ref(`songs/${song.id}`)
        .getDownloadURL()
        .then(url => playSong(song.id, url))
  }

  return (
    <main className={className}>
      <SearchSongForm onSongClick={handleSongClick} />
    </main>
  )
}

export default styled(ListAll)`
`
