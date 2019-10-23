import React, { useContext } from 'react'
import styled from 'styled-components'

import { AuthContext } from '../../utils/context'
import { Roles } from '../../utils/constants'
// import { generateKeywords } from '../../utils/text'

import photo from '../../assets/png/photo.png'

import IconedInput from '../../components/iconed-input'

const UploadSong = (props = {}) => {
  const { className } = props
  const { roles } = useContext(AuthContext)

  const isUploader = roles.includes(Roles.UPLOADER)

  return isUploader ? (
    <div className={className}>
      <form>
        <IconedInput type="file" iconUrl={photo} accept="audio/*" />
      </form>
    </div>
  ) : (
    <main>
      {'You are NOT an uploader...!'}
    </main>
  )
}

export default styled(UploadSong)`
`
