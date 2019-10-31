import React, { useCallback } from 'react'
import styled from 'styled-components'

import { usePlayingSong, usePlayerControll } from '../../hooks/player'
import { useModal } from '../../hooks/modal'

import SearchSongForm from '../../components/search-song-form'

type ListAllProps = { className?: string }
const ListAll = (props: ListAllProps = {}) => {
  const { className } = props

  const { showDialog, closeDialog } = useModal()
  const { currentSongId } = usePlayingSong()
  const { startSong, toggleAudio, stopSong } = usePlayerControll()

  const handleSongClick = useCallback(song => {
    currentSongId === song.id
      ? toggleAudio()
      : startSong(song.id, song.audioURL)
  }, [currentSongId, startSong, toggleAudio])
  const handleDeleteSong = useCallback((song: Song) => {
    console.info(`DELETING ${song.title}`)
    closeDialog()
  }, [])
  const handleSongDoubleClick = useCallback(song => {
    stopSong()

    showDialog((
      <>
        <h4>{'Delete song'}</h4>
        <div>{`Delete ${song.title}...?`}</div>
        <div>
          <button onClick={() => handleDeleteSong(song)}>
            {'YES'}
          </button>
          <button onClick={closeDialog}>
            {'CANCEL'}
          </button>
        </div>
      </>
    ))
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
