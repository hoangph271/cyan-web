import { useContext } from 'react'

import { PlayerContext } from '../providers/player-provider'

const usePlayerControll = () => {
  const { playAudio, pauseAudio, startSong, toggleAudio } = useContext(PlayerContext)

  return {
    toggleAudio,
    pauseAudio,
    playAudio,
    startSong,
  }
}

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