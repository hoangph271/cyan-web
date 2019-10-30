import React, { useRef, useState, useCallback, SyntheticEvent } from 'react'
import styled from 'styled-components'

import { validateUploadArtist } from '../utils/validators'
import { useModal } from '../hooks/modal'
import { useInput } from '../hooks/utils'

import FlatButton from './flat-button'
import IconedInput from './iconed-input'

import titleIcon from '../assets/png/title.png'
import houseIcon from '../assets/png/house.png'
import photoIcon from '../assets/png/photo.png'
import cakeIcon from '../assets/png/cake.png'

type CreateArtistFormProps = {
  className?: string,
  onArtistSubmit?: (artistInput: { artist: Artist, resetForm: () => void }) => void,
  isLoading?: boolean,
}
const CreateArtistForm = (props: CreateArtistFormProps) => {
  const { className, onArtistSubmit, isLoading } = props

  const [title, handleTitleChange, setTitle] = useInput('')
  const [dob, handleDoBChange, setDoB] = useInput('')
  const [pob, handlePoBChange, setPoB] = useInput('')
  const [fileKey, setFileKey] = useState(Date.now())
  const { showToast } = useModal()
  const avatarRef = useRef<HTMLInputElement | null>(null)

  const resetForm = useCallback(() => {
    setTitle('')
    setDoB('')
    setPoB('')
    setFileKey(Date.now())
  }, [setTitle, setDoB, setPoB, setFileKey])
  const handleCreateClicked = (e: SyntheticEvent) => {
    e.preventDefault()

    const avatar = ((avatarRef.current || {}).files || [])[0]
    const artist = {
      title,
      avatar,
      dob,
      pob,
    }

    const { isValid, errors } = validateUploadArtist(artist)

    if (isValid) {
      onArtistSubmit && onArtistSubmit({ artist, resetForm })
    } else {
      // TODO: Handle invalid input
      showToast(errors[0].message)
    }
  }

  return (
    <form className={className}>
      <IconedInput
        id="dob"
        type="text"
        value={title}
        iconUrl={titleIcon}
        placeholder="Title"
        onChange={handleTitleChange}
      />
      <IconedInput
        id="avatar"
        type="file"
        key={fileKey}
        ref={avatarRef}
        iconUrl={photoIcon}
        placeholder="Avatar"
        className="iconed-input"
      />
      <IconedInput
        id="dob"
        type="text"
        value={dob}
        iconUrl={cakeIcon}
        onChange={handleDoBChange}
        placeholder="Date of birth"
      />
      <IconedInput
        id="pob"
        type="text"
        value={pob}
        iconUrl={houseIcon}
        onChange={handlePoBChange}
        placeholder="Place of birth"
      />
      <FlatButton onClick={handleCreateClicked} disabled={isLoading} >
        {'Create'}
      </FlatButton>
    </form>
  )
}

export default styled(CreateArtistForm)`
  color: #000;
`
