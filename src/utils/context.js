import { createContext } from 'react'

const AuthContext = createContext({
  userInfo: null,
  roles: [],
})

const ModalContext = createContext({
  showToast: _ => {},
})

export {
  AuthContext,
  ModalContext,
}
