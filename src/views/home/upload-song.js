import React, { useContext } from 'react'
import styled from 'styled-components'

import { AuthContext } from '../../utils/context'
import { Roles } from '../../utils/constants'

import UploadSongForm from '../../components/upload-song-form'

const UploadSong = (props = {}) => {
  const { className } = props
  const { roles } = useContext(AuthContext)

  const isUploader = roles.includes(Roles.UPLOADER)

  return (
    <main className={className}>
      {isUploader ? (
        <UploadSongForm />
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
