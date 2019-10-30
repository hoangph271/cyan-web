import React, { useCallback } from 'react'
import styled from 'styled-components'

import { usePlayingSong, usePlayerControll } from '../../hooks/player'

import SearchSongForm from '../../components/search-song-form'

type ListAllProps = { className?: string }
const ListAll = (props: ListAllProps = {}) => {
  const { className } = props

  const { currentSongId } = usePlayingSong()
  const { startSong, toggleAudio, stopSong } = usePlayerControll()

  const handleSongClick = useCallback(song => {
    currentSongId === song.id
      ? toggleAudio()
      : startSong(song.id, song.audioURL)
  }, [currentSongId, startSong, toggleAudio])
  const handleSongDoubleClick = useCallback(song => {
    // TODO: Handle CONFIRM & DELETE
    console.warn(song)
    stopSong()
  }, [stopSong])

  return (
    <main className={className}>
      <SearchSongForm
        onSongClick={handleSongClick}
        onSongDoubleClick={handleSongDoubleClick}
      />
    </main>
  )
}

export default styled(ListAll)`
`
