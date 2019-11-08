import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { usePlayingSong, usePlayerControll } from '../../hooks/player'
import { useModal } from '../../hooks/modal'
import { generateUUID } from '../../utils'

import SearchSongForm from '../../components/search-song-form'
import DeleteSongDialog from '../../components/delete-song-dialog'

type ListAllProps = { className?: string }
const ListAll = (props: ListAllProps = {}) => {
  const { className } = props

  const [reloadKey, setReloadKey] = useState(generateUUID())

  const { currentSongId } = usePlayingSong()
  const { showDialog, closeDialog } = useModal()
  const { startSong, toggleAudio, stopSong } = usePlayerControll()

  const handleSongDeleted = useCallback((deletedSongId?: string) => {
    if (deletedSongId) {
      setReloadKey(generateUUID())
    }

    closeDialog()
  }, [closeDialog])
  const handleSongClick = useCallback((song: SongDocumentData) => {
    currentSongId === song.id ? toggleAudio() : startSong(song)
  }, [currentSongId, startSong, toggleAudio])
  const handleSongContextMenu = useCallback((song: SongDocumentData) => {
    stopSong()
    showDialog(<DeleteSongDialog songId={song.id} onFinish={handleSongDeleted} />)
  }, [stopSong, handleSongDeleted, showDialog])

  return (
    <main className={className}>
      <SearchSongForm
        key={reloadKey}
        onSongClick={handleSongClick}
        onContextMenu={handleSongContextMenu}
      />
    </main>
  )
}

export default styled(ListAll)`
`
