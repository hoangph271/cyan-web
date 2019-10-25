import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'

import { PlayerContext } from '../../providers/player-provider'

import SearchSongForm from '../../components/search-song-form'

const ListAll = (props = {}) => {
  const { className } = props

  const { currentSongId, startSong, toggleAudio } = useContext(PlayerContext)

  const handleSongClick = useCallback(song => {
    currentSongId === song.id
      ? toggleAudio()
      : startSong(song.id, song.audioURL)
  }, [currentSongId, startSong, toggleAudio])

  return (
    <main className={className}>
      <SearchSongForm onSongClick={handleSongClick} />
    </main>
  )
}

export default styled(ListAll)`
`
