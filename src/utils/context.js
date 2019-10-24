import { createContext } from 'react'

const AuthContext = createContext({
  userInfo: null,
  roles: [],
})

const ModalContext = createContext({
  showToast: _ => {},
})

const PlayerContext = createContext({
  playAudio: _ => {},
  pauseAudio: _ => {},
  toggleAudio: _ => {},
})

export {
  AuthContext,
  ModalContext,
  PlayerContext,
}
