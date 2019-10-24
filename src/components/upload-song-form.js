import React, { useRef, useState, useCallback } from 'react'
import styled from 'styled-components'

import { validateUploadSong } from '../utils/validators'
import { useInput } from '../utils/hooks'

import audioIcon from '../assets/png/audio.png'
import titleIcon from '../assets/png/title.png'

import Chip from './chip'
import FlatButton from './flat-button'
import IconedInput from './iconed-input'
import SearchArtistForm from './search-artist-form'

const UploadSongForm = (props = {}) => {
  const { className, isLoading } = props
  const { onSongSubmit } = props

  const audioRef = useRef(null)
  const [artists, setArtists] = useState([])
  const [fileKey, setFileKey] = useState(Date.now())
  const [title, handleTitleChange, setTitle] = useInput('')

  const resetForm = useCallback(_ => {
    setArtists([])
    setFileKey(Date.now())
    setTitle('')
  }, [setArtists, setFileKey, setTitle])

  const handleAudioChange = useCallback(_ => {
    if (title === '' && audioRef.current.files[0]) {
      setTitle(audioRef.current.files[0].name)
    }
  }, [title, setTitle])

  const handleArtistClick = useCallback(clickedArtist => {
    if (artists.find(artist => artist.id === clickedArtist.id)) {
      setArtists(artists.filter(artist => artist.id !== clickedArtist.id))
    } else {
      setArtists([...artists, clickedArtist])
    }

  }, [artists, setArtists])

  const handleUploadClick = e => {
    e.preventDefault()

    const song = {
      title,
      audio: audioRef.current.files[0],
      artists,
    }

    const { isValid, errors } = validateUploadSong(song)

    if (isValid) {
      onSongSubmit({
        song,
        resetForm,
      })
    } else {
      // TODO: Handle invalid input
      alert(errors.map(error => `${error.fieldName} - ${error.message}`).join(', '))
    }
  }

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
        key={fileKey}
        ref={audioRef}
        accept="audio/*"
        iconUrl={audioIcon}
        onChange={handleAudioChange}
      />
      <div>
        {artists.length === 0 ? (
          <div className="selected-artist">{'No artist selected...! :"{'}</div>
        ) : artists.map(artist => (
          <Chip
            className="selected-artist"
            key={artist.id}
            onClick={_ => handleArtistClick(artist)}
          >
            {artist.title}
          </Chip>
        ))}
      </div>
      <FlatButton onClick={handleUploadClick} disabled={isLoading}>
        {'Upload'}
      </FlatButton>
      <SearchArtistForm resultLimit={4} onArtistClick={handleArtistClick}/>
    </form>
  )
}

export default styled(UploadSongForm)`
`
