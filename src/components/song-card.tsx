import React from 'react'
import styled from 'styled-components'

import { usePlayingSong } from '../hooks/player'

import Chip from './chip'
import Card from './card'

type SongCardProps = {
  className?: string,
  song: SongDocumentData,
  onClick?: (song: SongDocumentData) => void,
  onDoubleClick?: (song: SongDocumentData) => void,
}
const SongCard = (props: SongCardProps) => {
  const { className = '', song, onClick, onDoubleClick } = props

  const { currentSongId, isPlaying } = usePlayingSong()

  const { artists = [] } = song
  const isCurrentSong = currentSongId === song.id

  const classNames = [
    className,
    isCurrentSong ? 'selected' : '',
    isCurrentSong && isPlaying ? 'using' : '',
  ].filter(Boolean).join(' ')

  return (
    <Card
      className={classNames}
      onClick={() => onClick && onClick(song)}
      onDoubleClick={() => onDoubleClick && onDoubleClick(song)}
    >
      <h4>{song.title}</h4>
      <div>
        {artists.length ? artists.map(artist => (
          <Chip onClick={e => e.stopPropagation() /* TODO: */} className="artist-title" key={artist.avatarURL}>
            {artist.title}
          </Chip>
        )) : (
          <span>
            {'Unknown artist'}
          </span>
        )}
      </div>
    </Card>
  )
}

export default styled(SongCard)`
`
