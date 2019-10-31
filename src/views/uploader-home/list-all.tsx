import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import { usePlayingSong, usePlayerControll } from '../../hooks/player'
import { useModal } from '../../hooks/modal'
import { songsCollection } from '../../utils/firebase'

import SearchSongForm from '../../components/search-song-form'

type ListAllProps = { className?: string }
const ListAll = (props: ListAllProps = {}) => {
  const { className } = props

  const [deletedSongId, setDeletedSongId] = useState('')
  const [isDeletingSong, setIsDeletingSong] = useState(false)

  const { currentSongId } = usePlayingSong()
  const { showDialog, closeDialog } = useModal()
  const { startSong, toggleAudio, stopSong } = usePlayerControll()

  const handleSongClick = useCallback((song: SongDocument) => {
    currentSongId === song.id ? toggleAudio() : startSong(song)
  }, [currentSongId, startSong, toggleAudio])
  const handleDeleteSong = useCallback(async (songId: string) => {
    if (isDeletingSong) {
      console.error('Still deleting a song, dude...?')
      return
    }

    setIsDeletingSong(true)

    try {
      await firebase.storage().ref(`/songs/${songId}`).delete()
      await songsCollection().doc(songId).delete()
    } catch (error) {
      console.error(error)
    }

    closeDialog()
    setIsDeletingSong(false)
    setDeletedSongId(songId)
  }, [closeDialog, isDeletingSong, setIsDeletingSong])
  const handleSongDoubleClick = useCallback((song: SongDocument) => {
    stopSong()

    showDialog((
      <>
        <h4>{'Delete song'}</h4>
        <div>{`Delete ${song.title}...?`}</div>
        <div>
          <button disabled={isDeletingSong} onClick={() => handleDeleteSong(song.id)}>
            {'YES'}
          </button>
          <button disabled={isDeletingSong} onClick={closeDialog}>
            {'CANCEL'}
          </button>
        </div>
      </>
    ))
  }, [stopSong, closeDialog, handleDeleteSong, isDeletingSong, showDialog])

  return (
    <main className={className}>
      <SearchSongForm
        key={deletedSongId}
        onSongClick={handleSongClick}
        onSongDoubleClick={handleSongDoubleClick}
      />
    </main>
  )
}

export default styled(ListAll)`
`
