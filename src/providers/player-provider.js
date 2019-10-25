import React, { createContext, useState, useCallback, useEffect } from 'react'
import { Howl } from 'howler'

const format = ['mp3']
const PlayerContext = createContext({
  currentSongId: null,
  toggleAudio: null,
  pauseAudio: null,
  playAudio: null,
  isPlaying: null,
  startSong: null,
})

const PlayerProvider = ({ children }) => {
  const [audio, setAudio] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongId, setCurrentSongId] = useState(null)

  useEffect(_ => {
    audio && audio.on('play', _ => setIsPlaying(true))
    audio && audio.on('end', _ => setIsPlaying(false))
    audio && audio.on('stop', _ => setIsPlaying(false))
    audio && audio.on('pause', _ => setIsPlaying(false))

    return _ => audio && audio.off().unload()
  }, [audio])

  const pauseAudio = useCallback(_ => audio && audio.pause(), [audio])
  const playAudio = useCallback(_ => audio && audio.play(), [audio])
  const startSong = useCallback((songId, audioURL) => {
    setAudio(new Howl({ src: [audioURL], format, html5: true, autoplay: true }))
    setCurrentSongId(songId)
  }, [setAudio])
  const toggleAudio = useCallback(_ => {
    if (audio) {
      audio.playing() ? pauseAudio() : playAudio()
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
        startSong,
      }}
      children={children}
    />
  )
}

export {
  PlayerProvider,
  PlayerContext,
}
