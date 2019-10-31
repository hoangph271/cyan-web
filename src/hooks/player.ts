import { useContext } from 'react'

import { PlayerContext } from '../providers/player-provider'

const usePlayerControll = () => useContext(PlayerContext)

const usePlayingSong = () => {
  const { isPlaying, currentSongId } = useContext(PlayerContext)

  return {
    isPlaying,
    currentSongId,
  }
}

export {
  usePlayingSong,
  usePlayerControll,
}
