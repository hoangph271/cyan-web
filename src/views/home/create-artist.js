import React, { useCallback, useState, useContext } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import { AuthContext } from '../../context'
import { artistsCollection } from '../../utils/firestore'
import { Roles } from '../../utils/constants'
import { generateKeywords } from '../../utils/text'

import CreateArtistForm from '../../components/create-artist-form'

const CreateArtist = (props = {}) => {
  const { roles } = useContext(AuthContext)
  const { className } = props
  const [isLoading, setIsLoading] = useState(false)

  const handleArtistSubmit = useCallback(async ({ artist, resetForm }) => {
    if (isLoading) return

    setIsLoading(true)

    try {
      const { title, avatar, dob, pob } = artist
      const keywords = generateKeywords(title)

      const docRef = artistsCollection().doc()

      const avatarURL = avatar
        ? await firebase.storage()
          .ref(`artists/${docRef.id}`)
          .put(avatar)
          .then(snapshot => snapshot.ref.getDownloadURL())
        : null

      await docRef.set({ title, keywords, avatarURL, dob, pob }).then()
      resetForm()
    } catch (error) {
      console.error(error)
      // TODO: Handle errors here
    }

    setIsLoading(false)
  }, [isLoading])

  const isUploader = roles.includes(Roles.UPLOADER)

  return isUploader ? (
    <main className={className}>
      {roles.includes(Roles.UPLOADER) && (
        <CreateArtistForm isLoading={isLoading} onArtistSubmit={handleArtistSubmit} />
      )}
    </main>
  ) : (
    <main>
      {'You are NOT an uploader...!'}
    </main>
  )
}

export default styled(CreateArtist)`
`
