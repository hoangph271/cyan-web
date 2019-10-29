import { useContext } from 'react'

import { ModalContext } from '../providers/modal-provider'

const useModal = _ => {
  const { showToast } = useContext(ModalContext)

  return { showToast }
}

export {
  useModal,
}