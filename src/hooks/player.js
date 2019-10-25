import { useContext } from 'react'

import { PlayerContext } from '../providers/player-provider'

const usePlayingSong = _ => {
  const { isPlaying, currentSongId } = useContext(PlayerContext)

  return {
    isPlaying,
    currentSongId,
  }
}

export {
  usePlayingSong,
}