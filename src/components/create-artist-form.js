import React, { useRef, useState, useCallback } from 'react'
import styled from 'styled-components'

import { validateArtist } from '../utils/validators'
import { useInput } from '../utils/hooks'

import FlatButton from '../components/flat-button'
import IconedInput from '../components/iconed-input'

import titleIcon from '../assets/png/title.png'
import houseIcon from '../assets/png/house.png'
import photoIcon from '../assets/png/photo.png'
import cakeIcon from '../assets/png/cake.png'

const CreateArtistForm = props => {
  const { className, onArtistSubmit, isLoading } = props

  const [title, handleTitleChange, setTitle] = useInput('')
  const [dob, handleDoBChange, setDoB] = useInput('')
  const [pob, handlePoBChange, setPoB] = useInput('')
  const [fileKey, setFileKey] = useState(Date.now())
  const avatarRef = useRef()

  const resetForm = useCallback(_ => {
    setTitle('')
    setDoB('')
    setPoB('')
    setFileKey(Date.now())
  }, [setTitle, setDoB, setPoB, setFileKey])
  const handleCreateClicked = e => {
    e.preventDefault()

    const artist = {
      title,
      avatar: avatarRef.current.files[0],
      dob,
      pob,
    }

    const { isValid, errors } = validateArtist(artist)

    if (isValid) {
      onArtistSubmit({ artist, resetForm })
    } else {
      alert(errors.map(error => `${error.fieldName} - ${error.message}`).join(', '))
      // TODO: Handle invalid input
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
