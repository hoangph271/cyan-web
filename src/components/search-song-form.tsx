import React, { useCallback } from 'react'
import styled from 'styled-components'

import { usePlayingSong } from '../hooks/player'
import { songsCollection } from '../utils/firebase'

import Chip from './chip'
import SearchCollectionForm from './search-collection-form'

type SearchSongFormProps = {
  className?: string,
  resultLimit?: number,
  onSongClick?: (song: SongDocumentData) => void,
  onSongDoubleClick?: (song: SongDocumentData) => void,
}
const SearchSongForm = (props: SearchSongFormProps = {}) => {
  const { className, resultLimit, onSongClick, onSongDoubleClick } = props

  return (
    <SearchCollectionForm
      sortField="title"
      className={className}
      resultLimit={resultLimit}
      firebaseCollection={songsCollection}
      buildItems={items => (
        <SongList
          songs={items}
          onSongClick={onSongClick}
          onSongDoubleClick={onSongDoubleClick}
        />
      )}
    />
  )
}

export default styled(SearchSongForm)`
`

type SongListProps = {
  className?: string,
  songs?: SongDocumentData[],
  onSongClick?: (song: SongDocumentData) => void,
  onSongDoubleClick?: (song: SongDocumentData) => void,
}
const SongList = styled((props: SongListProps = {}) => {
  const { className, songs = [], onSongClick, onSongDoubleClick } = props

  const { isPlaying, currentSongId } = usePlayingSong()
  const itemClassNames = useCallback(songId => {
    const isCurrentSong = currentSongId === songId

    const currentSongCN = isCurrentSong ? 'current-song' : ''
    const playingCN = isCurrentSong && isPlaying ? 'playing' : ''

    return [currentSongCN, playingCN].join(' ')
  }, [isPlaying, currentSongId])

  return (
    <div className={className}>
      {songs.length === 0 ? (
        <div>{`No result...! :'{`}</div>
      ) : songs.map((song: SongDocumentData) => (
          <Chip
            className={itemClassNames(song.id)}
            key={song.id}
            onClick={() => onSongClick && onSongClick(song)}
            onDoubleClick={() => onSongDoubleClick && onSongDoubleClick(song)}
          >
            {`${song.title} - ${song.artists && song.artists.map((artist: Artist) => artist.title).join(', ')}`}
          </Chip>
      ))}
    </div>
  )
})`
  .current-song {
    box-shadow: ${props => props.theme.deepCurrentShadow};
  }
  .current-song.playing {
    box-shadow: ${props => props.theme.deepSelectedShadow};
  }
`
