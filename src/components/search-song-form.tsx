import React, { useCallback } from 'react'
import styled from 'styled-components'

import { usePlayingSong } from '../hooks/player'
import { songsCollection } from '../utils/firebase'

import Chip from './chip'
import SearchCollectionForm from './search-collection-form'

type SearchSongFormProps = {
  className?: string,
  resultLimit?: number,
  onSongClick?: (song: Song) => void,
}
const SearchSongForm = (props: SearchSongFormProps = {}) => {
  const { className, resultLimit, onSongClick } = props

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
        />
      )}
    />
  )
}

export default styled(SearchSongForm)`
`

// TODO: Style this
type SongListProps = {
  className?: string,
  songs?: Array<{  }>,
  onSongClick?: (song: Song) => void,
}
const SongList = styled((props: SongListProps = {}) => {
  const { className } = props
  const { songs = [], onSongClick = () => {} } = props

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
      ) : (
        songs.map((song) => (
          <Chip
            className={itemClassNames((song as Song).id)}
            key={(song as Song).id}
            onClick={() => onSongClick(song as Song)}
          >
            {`${(song as Song).title} - ${(song as Song).artists && (song as Song).artists.map((artist: Artist) => artist.title).join(', ')}`}
          </Chip>
      )))}
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
