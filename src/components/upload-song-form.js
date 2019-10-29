import React, { useRef, useState, useCallback, useContext } from 'react'
import styled from 'styled-components'

import { validateUploadSong } from '../utils/validators'
import { ModalContext } from '../utils/context'
import { useInput } from '../hooks/utils'

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
  const { showToast } = useContext(ModalContext)
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
      showToast(errors[0].message)
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
      <div className="expand-parent-margin">
        {artists.length === 0 ? (
          <div className="no-artist-selected">{'No artist selected...! :"{'}</div>
        ) : artists.map(artist => (
          <Chip
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
  .expand-parent-margin {
    // FIX collapsing margins
    overflow: hidden;
  }
  .no-artist-selected {
    margin: ${props => props.theme.shallowMargin};
  }
`
