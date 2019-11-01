import React from 'react'
import styled from 'styled-components'

import { songsCollection } from '../utils/firebase'
import { MinWidths } from '../utils/constants'

import SongCard from './song-card'
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

  return (
    <div className={className}>
      {songs.length === 0 ? (
        <div>{`No result...! :'{`}</div>
      ) : (
        <div className="songs-container">
          {songs.map(song => (
            <SongCard
              key={song.id}
              song={song}
              onClick={onSongClick}
              onDoubleClick={onSongDoubleClick}
            />
          ))}
        </div>
      )}
    </div>
  )
})`
  .songs-container {
    display: grid;
    grid-gap: ${props => props.theme.deepMargin};
    grid-template-columns: repeat(1, 1fr);

    @media ${MinWidths.MEDIUM} {
      grid-template-columns: repeat(2, 1fr);
    }
    @media ${MinWidths.LARGE} {
      grid-template-columns: repeat(3, 1fr);
    }
    @media ${MinWidths.EXTRA} {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`
