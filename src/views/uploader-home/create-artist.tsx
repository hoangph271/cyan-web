import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import { useAuth } from '../../hooks/auth'
import { Roles } from '../../utils/constants'
import { generateAllKeywords } from '../../utils/text'
import { artistsCollection } from '../../utils/firebase'

import CreateArtistForm from '../../components/create-artist-form'

type CreateArtistProps = {
  className?: string,
}
const CreateArtist = (props: CreateArtistProps) => {
  const { className } = props

  const { roles } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleArtistSubmit = useCallback(async ({ artist, resetForm }) => {
    if (isLoading) return

    setIsLoading(true)

    try {
      const { title, avatar, dob, pob } = artist
      const keywords = generateAllKeywords(title)

      const docRef = artistsCollection().doc()

      const avatarURL = avatar
        ? await firebase.storage()
          .ref(`artists/${docRef.id}`)
          .put(avatar)
          .then(snapshot => snapshot.ref.getDownloadURL())
        : null

      await docRef.set({ title, keywords, avatarURL, dob, pob })

      resetForm()
    } catch (error) {
      console.error(error)
      // TODO: Handle errors here
    }

    setIsLoading(false)
  }, [isLoading])

  const isUploader = roles ? roles.includes(Roles.UPLOADER) : false

  return (
    <main className={className}>
      {isUploader ? (
      <CreateArtistForm isLoading={isLoading} onArtistSubmit={handleArtistSubmit} />
      ) : (
        <div>{'You are NOT an uploader...!'}</div>
      )}
    </main>
  )
}

export default styled(CreateArtist)`
`
