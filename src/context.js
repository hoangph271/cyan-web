import { createContext } from 'react'

const AuthContext = createContext({
  userInfo: null,
  roles: [],
})

export {
  AuthContext,
}
