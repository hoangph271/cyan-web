import { useContext } from 'react'

import { ModalContext } from '../providers/modal-provider'

const useModal = () => useContext(ModalContext)

export {
  useModal,
}
