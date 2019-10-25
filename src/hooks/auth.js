import { useContext } from 'react'

import { AuthContext } from '../providers/auth-provider'

const useAuth = _ => {
  const { roles, userInfo } = useContext(AuthContext)

  return { roles, userInfo }
}

export {
  useAuth,
}