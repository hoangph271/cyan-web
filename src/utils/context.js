import { createContext } from 'react'

const AuthContext = createContext({
  userInfo: null,
  roles: [],
})


const PlayerContext = createContext({
  playAudio: _ => {},
  pauseAudio: _ => {},
  toggleAudio: _ => {},
})

export {
  AuthContext,
  PlayerContext,
}
