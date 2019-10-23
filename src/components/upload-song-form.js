import React, { useRef, useState, useCallback } from 'react'
import styled from 'styled-components'

import { useInput } from '../utils/hooks'

import audioIcon from '../assets/png/audio.png'
import titleIcon from '../assets/png/title.png'

import Chip from './chip'
import IconedInput from './iconed-input'
import SearchArtistForm from './search-artist-form'

const UploadSongForm = (props = {}) => {
  const { className } = props

  const audioRef = useRef(null)
  const [artists, setArtists] = useState([])
  const [title, handleTitleChange, setTitle] = useInput('')

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
      <div>
        {artists.length === 0 ? (
          <div>{'No artist selected...! :"{'}</div>
        ) : artists.map(artist => (
          <Chip
            key={artist.id}
            text={artist.title}
            onClick={_ => handleArtistClick(artist)}
          />
        ))}
      </div>
      <SearchArtistForm resultLimit={4} onArtistClick={handleArtistClick}/>
    </form>
  )
}

export default styled(UploadSongForm)`

`
