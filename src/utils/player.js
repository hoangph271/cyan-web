import { Howl } from 'howler'

const audioFormats = ['mp3']

const { playAudio, pauseAudio, toggleAudio } = (_ => {
  let audio

  const pauseAudio = _ => audio && audio.playing() && audio.pause()
  const toggleAudio = _ => audio && (audio.playing() ? audio.pause() : audio.play())
  const playAudio = url => {
    pauseAudio()

    audio = new Howl({ src: [url], format: audioFormats, html5: true })
    audio.play()
  }

  return {
    playAudio,
    pauseAudio,
    toggleAudio,
  }
})()

export {
  playAudio,
  pauseAudio,
  toggleAudio,
}
