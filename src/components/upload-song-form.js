import React from 'react'
import styled from 'styled-components'

import audio from '../assets/png/audio.png'

import IconedInput from './iconed-input'

const UploadSongForm = (props = {}) => {
  const { className } = props

  return (
    <form className={className}>
      <IconedInput type="file" iconUrl={audio} accept="audio/*" />
    </form>
  )
}

export default styled(UploadSongForm)`

`
