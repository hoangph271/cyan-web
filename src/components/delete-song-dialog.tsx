import React, { useState, useCallback, useEffect } from 'react'
import firebase from 'firebase'

import { songsCollection } from '../utils/firebase'
import { useModal } from '../hooks/modal'

import ZenCircle from '../components/zen-circle'

type DeleteSongDialogProps = {
  className?: string,
  songId: string,
  onFinish: (songId?: string) => void,
}
const DeleteSongDialog = (props: DeleteSongDialogProps) => {
  const { className, songId, onFinish } = props

  const { showToast } = useModal()

  const [song, setSong] = useState<SongDocumentData | null>(null)
  const [isDeletingSong, setIsDeletingSong] = useState(false)
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

    setIsDeletingSong(false)
    onFinish(songId)
  }, [onFinish, isDeletingSong, setIsDeletingSong])

  useEffect(() => {
    songsCollection()
      .doc(songId)
      .get()
      .then(doc => {
        if (doc.data()) {
          setSong({
            id: songId,
            ...doc.data(),
          })
        } else {
          showToast('Song does NOT exist...! ¯\\_(ツ)_/¯')
          onFinish()
        }
      })
  }, [onFinish, showToast, songId])

  return (
    <div className={className}>
      <h4>{'Delete song'}</h4>
      {song ? (
        <>
          <div>{`Delete ${song.title}...?`}</div>
          {isDeletingSong ? (
            <ZenCircle />
          ) : (
            <div>
              <button onClick={() => handleDeleteSong(song.id)}>
                {'YES'}
              </button>
              <button onClick={() => onFinish()}>
                {'CANCEL'}
              </button>
            </div>
          )}
        </>
      ) : (
        <ZenCircle />
      )}
    </div>
  )
}

export default DeleteSongDialog
