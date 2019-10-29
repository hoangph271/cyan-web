import React, { useCallback } from 'react'
import styled from 'styled-components'

import { usePlayingSong, usePlayerControll } from '../../hooks/player'

import SearchSongForm from '../../components/search-song-form'

const ListAll = (props = {}) => {
  const { className } = props

  const { currentSongId } = usePlayingSong()
  const { startSong, toggleAudio } = usePlayerControll()

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
