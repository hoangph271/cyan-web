import React, { createContext, useState, useCallback } from 'react'
import { Howl } from 'howler'

const audioFormats = ['mp3']
const PlayerContext = createContext({
  currentSongId: null,
  isPlaying: false,
  playAudio: _ => {},
  pauseAudio: _ => {},
  toggleAudio: _ => {},
})

const PlayerProvider = ({ children }) => {
  const [audio, setAudio] = useState(null)
  const [currentSongId, setCurrentSongId] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const pauseAudio = useCallback(_ => {
    if (isPlaying) {
      setIsPlaying(false)
      audio.pause()
    }
  }, [audio, isPlaying])
  const playAudio = useCallback((songId, audioURL) => {
    pauseAudio()

    const audio = new Howl({ src: [audioURL], format: audioFormats, html5: true })

    setAudio(audio)
    setCurrentSongId(songId)

    audio.play()

  }, [pauseAudio, setAudio])
  const toggleAudio = useCallback(_ => {
    if (audio) {
      audio.playing()
      ? pauseAudio()
      : playAudio()
    }
  }, [audio, pauseAudio, playAudio])

  return (
    <PlayerContext.Provider
      value={{
        currentSongId,
        toggleAudio,
        pauseAudio,
        playAudio,
        isPlaying,
      }}
      children={children}
    />
  )
}

export {
  PlayerProvider,
  PlayerContext,
}
