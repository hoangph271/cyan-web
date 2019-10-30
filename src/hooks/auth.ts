import { useContext } from 'react'

import { AuthContext } from '../providers/auth-provider'

const useAuth = () => {
  const { roles, user } = useContext(AuthContext)

  return { roles, user }
}

export {
  useAuth,
}