import React, { createContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { Howl } from 'howler'

const format = ['mp3']

type PlayerContextProps = {
  currentSongId: string | null,
  toggleAudio: (() => void),
  pauseAudio: (() => void),
  playAudio: (() => void),
  stopSong: (() => void),
  startSong: ((song: Song) => void),
  isPlaying: boolean,
}
const PlayerContext = createContext<PlayerContextProps>({} as PlayerContextProps)

type PlayerProviderProps = { children?: ReactNode }
const PlayerProvider = (props: PlayerProviderProps) => {
  const { children } = props

  const [audio, setAudio] = useState<Howl | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongId, setCurrentSongId] = useState<string | null>(null)

  useEffect(() => {
    audio && audio.on('play', () => setIsPlaying(true))
    audio && audio.on('end', () => setIsPlaying(false))
    audio && audio.on('pause', () => setIsPlaying(false))
    audio && audio.on('stop', () => {
      setCurrentSongId(null)
      setIsPlaying(false)
      setAudio(null)
    })

    return () => {
      audio && audio.off('pause').off('play').off('stop').off('end').unload()
    }
  }, [audio])

  const pauseAudio = useCallback(() => audio && audio.pause(), [audio])
  const playAudio = useCallback(() => audio && audio.play(), [audio])
  const stopSong = useCallback(() => audio && audio.stop(), [audio])
  const startSong = useCallback(({ id, audioURL }) => {
    setAudio(new Howl({ src: [audioURL], format, html5: true, autoplay: true }))
    setCurrentSongId(id)
    setIsPlaying(false)
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
        stopSong,
      }}
      children={children}
    />
  )
}

export {
  PlayerProvider,
  PlayerContext,
}
