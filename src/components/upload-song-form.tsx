import React, { useRef, useState, useCallback } from 'react'
import styled from 'styled-components'

import { validateUploadSong } from '../utils/validators'
import { useModal } from '../hooks/modal'
import { useInput } from '../hooks/utils'

import audioIcon from '../assets/png/audio.png'
import titleIcon from '../assets/png/title.png'

import Chip from './chip'
import FlatButton from './flat-button'
import IconedInput from './iconed-input'
import SearchArtistForm from './search-artist-form'

type UploadSongFormProps = {
  className?: string,
  isLoading?: boolean,
  onSongSubmit?: (props: { song: Song, resetForm?: () => void }) => void,
}
const UploadSongForm = (props: UploadSongFormProps) => {
  const { className, isLoading, onSongSubmit } = props

  const audioRef = useRef<HTMLInputElement>(null)
  const { showToast } = useModal()
  const [artists, setArtists] = useState<ArtistDocumentData[]>([])
  const [fileKey, setFileKey] = useState(Date.now())
  const [title, handleTitleChange, setTitle] = useInput('')

  const resetForm = useCallback(() => {
    setArtists([])
    setFileKey(Date.now())
    setTitle('')
  }, [setArtists, setFileKey, setTitle])

  const handleAudioChange = useCallback(_ => {
    const audioFile = audioRef.current && audioRef.current.files && audioRef.current.files[0]

    if (title === '' && audioFile) {
      setTitle(audioFile.name)
    }
  }, [title, setTitle])

  const handleArtistClick = useCallback(clickedArtist => {
    if (artists.find(artist => artist.id === clickedArtist.id)) {
      setArtists(artists.filter(artist => artist.id !== clickedArtist.id))
    } else {
      setArtists([...artists, clickedArtist])
    }

  }, [artists, setArtists])

  const handleUploadClick = (e: React.SyntheticEvent) => {
    const audioFile = audioRef.current && audioRef.current.files && audioRef.current.files[0]

    e.preventDefault()

    const song = {
      title,
      audio: audioFile,
      artists,
    }

    const { isValid, errors } = validateUploadSong(song)

    if (isValid) {
      onSongSubmit && onSongSubmit({
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
            onClick={() => handleArtistClick(artist)}
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
