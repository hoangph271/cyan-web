import React, { useRef, useState, useCallback } from 'react'
import styled from 'styled-components'

import { validateArtist } from '../../utils/validators'
import { useInput } from '../../hooks'
import personid from '../../assets/png/person-id.png'
import house from '../../assets/png/house.png'
import photo from '../../assets/png/photo.png'
import cake from '../../assets/png/cake.png'

const CreateArtistForm = props => {
  const { className, onArtistSubmit, isLoading } = props

  const [avatarText, setAvatarText] = useState('No file choosen')
  const [title, handleTitleChange, setTitle] = useInput('')
  const [dob, handleDoBChange, setDoB] = useInput('')
  const [pob, handlePoBChange, setPoB] = useInput('')
  const [fileKey, setFileKey] = useState(Date.now())
  const avatar = useRef()

  const handleAvatarChange = _ => {
    const avatarText = avatar.current && avatar.current.files[0]
      ? avatar.current.files[0].name
      : 'No file choosen'
    setAvatarText(avatarText);
  }
  const resetForm = useCallback(_ => {
    setTitle('')
    setDoB('')
    setPoB('')
    setFileKey(Date.now())

    handleAvatarChange()
  }, [setTitle, setDoB, setPoB, setFileKey])
  const handleCreateClicked = e => {
    e.preventDefault()

    const artist = {
      title,
      avatar: avatar.current.files[0],
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
      <h3>{'Create artist...?'}</h3>
      <div className="control-group">
        <label className="label title-label" htmlFor="title" title="Title" />
        <input id="title" className="input" type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div className="control-group">
        <label className="label avatar-label" htmlFor="avatar" title="Avatar"></label>
        <input
          id="avatar"
          type="file"
          ref={avatar}
          key={fileKey}
          accept="image/*"
          className="input"
          onChange={handleAvatarChange}
          data-display-text={avatarText}
        />
      </div>
      <div className="control-group">
        <label className="label dob-label" htmlFor="dob" title="Date of birth" />
        <input id="dob" className="input" type="text" value={dob} onChange={handleDoBChange} />
      </div>
      <div className="control-group">
        <label className="label pob-label" htmlFor="pob" title="Place of birth" />
        <input id="pob" className="input" type="text" value={pob} onChange={handlePoBChange} />
      </div>
      <button onClick={handleCreateClicked} disabled={isLoading} >
        {'Create'}
      </button>
    </form>
  )
}

export default styled(CreateArtistForm)`
  .control-group {
    background-color: #282c34;
    justify-content: center;
    border-radius: 0.2rem;
    margin: 0.5rem 0.2rem;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    height: 2rem;
  }

  .label {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
    flex-basis: 2rem;
    cursor: pointer;
  }

  .input {
    border-bottom-right-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    background-color: #fff;
    border: 1px solid gray;
    padding: 0 0.4rem;
    flex-grow: 1;
  }

  #avatar {
    position: relative;
    border: none;
  }
  #avatar::before {
    border-bottom-right-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    background-color: #fff;
    border: 1px solid gray;
    align-items: center;
    position: absolute;
    padding: 0 0.4rem;
    cursor: pointer;
    content: attr(data-display-text);
    display: flex;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }

  .title-label {
    background-image: url(${personid});
  }
  .avatar-label {
    background-image: url(${photo});
  }
  .dob-label {
    background-image: url(${cake});
  }
  .pob-label {
    background-image: url(${house});
  }
`
