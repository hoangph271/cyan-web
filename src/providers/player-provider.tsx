import React, { createContext, useState, useCallback, useEffect } from 'react'
import { Howl } from 'howler'

const format = ['mp3']

type PlayerContextProps = {
  currentSongId: string | null,
  toggleAudio: (() => void),
  pauseAudio: (() => void),
  playAudio: (() => void),
  startSong: ((songId: string, audioURL: string) => void),
  isPlaying: boolean,
}
const PlayerContext = createContext<PlayerContextProps>({} as PlayerContextProps)

type PlayerProviderProps = { children?: React.ReactNode }
const PlayerProvider = (props: PlayerProviderProps) => {
  const { children } = props

  const [audio, setAudio] = useState<Howl | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongId, setCurrentSongId] = useState<string | null>(null)

  useEffect(() => {
    audio && audio.on('play', _ => setIsPlaying(true))
    audio && audio.on('end', _ => setIsPlaying(false))
    audio && audio.on('stop', _ => setIsPlaying(false))
    audio && audio.on('pause', _ => setIsPlaying(false))

    return () => {
      audio && audio
        .off('pause')
        .off('play')
        .off('stop')
        .off('end')
        .unload()
    }
  }, [audio])

  const pauseAudio = useCallback(() => audio && audio.pause(), [audio])
  const playAudio = useCallback(() => audio && audio.play(), [audio])
  const startSong = useCallback((songId, audioURL) => {
    setAudio(new Howl({ src: [audioURL], format, html5: true, autoplay: true }))
    setIsPlaying(false)
    setCurrentSongId(songId)
  }, [setAudio])
  const toggleAudio = useCallback(() => {
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
