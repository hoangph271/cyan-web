import React, { useRef, useCallback } from 'react'
import styled from 'styled-components'

import { useInput } from '../utils/hooks'

import audioIcon from '../assets/png/audio.png'
import titleIcon from '../assets/png/title.png'

import IconedInput from './iconed-input'

const UploadSongForm = (props = {}) => {
  const { className } = props

  const audioRef = useRef(null)
  const [title, handleTitleChange, setTitle] = useInput('')

  const handleAudioChange = useCallback(_ => {
    if (title === '' && audioRef.current.files[0]) {
      setTitle(audioRef.current.files[0].name)
    }
  }, [title, setTitle])

  return (
    <form className={className}>
      <IconedInput
        type="text"
        value={title}
        placeholder="Title"
        iconUrl={titleIcon}
        onChange={handleTitleChange}
      />
      <IconedInput
        type="file"
        ref={audioRef}
        accept="audio/*"
        iconUrl={audioIcon}
        onChange={handleAudioChange}
      />
    </form>
  )
}

export default styled(UploadSongForm)`

`
