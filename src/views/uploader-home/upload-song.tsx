import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import { useAuth } from '../../hooks/auth'
import { Roles } from '../../utils/constants'
import { generateAllKeywords } from '../../utils/text'
import { songsCollection } from '../../utils/firebase'

import UploadSongForm from '../../components/upload-song-form'

type UploadSongProps = {
  className?: string,
}
const UploadSong = (props: UploadSongProps) => {
  const { className } = props

  const { roles } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const isUploader = roles ? roles.includes(Roles.UPLOADER) : false

  const handleSongSubmit = useCallback(async ({ song, resetForm }) => {
    if (isLoading) {
      return
    }

    setIsLoading(true)

    try {
      const { audio, title, artists } = song
      const keywords = generateAllKeywords(title)

      const docRef = songsCollection().doc()

      const audioURL = await firebase.storage()
        .ref(`/songs/${docRef.id}`)
        .put(audio)
        .then(snapshot => snapshot.ref.getDownloadURL())

      await docRef.set({
        title,
        keywords,
        audioURL,
        artists: artists.map((artist: ArtistDocument) => ({ id: artist.id, title: artist.title }))
      })

      resetForm()
    } catch (error) {
      console.error(error)
      // TODO: Handle errors here
    }

    setIsLoading(false)
  }, [isLoading])

  return (
    <main className={className}>
      {isUploader ? (
        <UploadSongForm isLoading={isLoading} onSongSubmit={handleSongSubmit} />
      ) : (
        <div>
          {'You are NOT an uploader...!'}
        </div>
      )}
    </main>
  )
}

export default styled(UploadSong)`
`
