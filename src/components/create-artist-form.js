import React, { useRef, useState, useCallback } from 'react'
import styled from 'styled-components'

import { validateArtist } from '../utils/validators'
import { useInput } from '../hooks'

import FlatButton from '../components/flat-button'
import IconedInput from '../components/iconed-input'

import personid from '../assets/png/person-id.png'
import house from '../assets/png/house.png'
import photo from '../assets/png/photo.png'
import cake from '../assets/png/cake.png'

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
      <IconedInput id="dob" type="text" value={title} onChange={handleTitleChange} iconUrl={personid} />
      <IconedInput
        id="avatar"
        type="file"
        key={fileKey}
        ref={avatarRef}
        iconUrl={photo}
        className="iconed-input"
      />
      <IconedInput id="dob" type="text" value={dob} onChange={handleDoBChange} iconUrl={cake} />
      <IconedInput id="pob" type="text" value={pob} onChange={handlePoBChange} iconUrl={house} />
      <FlatButton onClick={handleCreateClicked} disabled={isLoading} >
        {'Create'}
      </FlatButton>
    </form>
  )
}

export default styled(CreateArtistForm)`
  color: #000;
`

// #avatar {
//   position: relative;
//   border: none;
// }
// #avatar::before {
//   border-bottom-right-radius: 0.2rem;
//   content: attr(data-display-text);
//   border-top-right-radius: 0.2rem;
//   text-overflow: ellipsis;
//   background-color: #fff;
//   border: 1px solid #282c34;
//   align-items: center;
//   white-space: nowrap;
//   position: absolute;
//   padding: 0 0.4rem;
//   cursor: pointer;
//   display: flex;
//   bottom: 0;
//   right: 0;
//   left: 0;
//   top: 0;
// }