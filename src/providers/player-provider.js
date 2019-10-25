import React, { createContext, useState, useCallback, useEffect } from 'react'
import { Howl } from 'howler'

const audioFormats = ['mp3']
const PlayerContext = createContext({
  currentSongId: null,
  isPlaying: false,
  playSong: _ => {},
  pauseSong: _ => {},
  togglePlay: _ => {},
})

const PlayerProvider = ({ children }) => {
  const [audio, setAudio] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongId, setCurrentSongId] = useState(null)

  useEffect(_ => {
    if (audio) {
      audio.on('play', _ => setIsPlaying(true))
      audio.on('end', _ => setIsPlaying(false))
      audio.on('stop', _ => setIsPlaying(false))
      audio.on('pause', _ => setIsPlaying(false))
    } else {
      setCurrentSongId(null)
    }

    return _ => audio && audio.off() && audio.unload()
  }, [audio])

  const pauseSong = useCallback(_ => audio && audio.pause(), [audio])
  const playSong = useCallback((songId, audioURL) => {
    const audio = new Howl({ src: [audioURL], format: audioFormats, html5: true })

    setAudio(audio)
    setCurrentSongId(songId)

    audio.play()
  }, [setAudio])
  const togglePlay = useCallback(_ => {
    if (audio) {
      audio.playing()
        ? pauseSong()
        : playSong()
    }
  }, [audio, pauseSong, playSong])

  return (
    <PlayerContext.Provider
      value={{
        currentSongId,
        togglePlay,
        pauseSong,
        playSong,
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
