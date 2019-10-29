import React, { useState, useCallback, createContext } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

import Toast from '../components/toast'

const modalRoot = document.getElementById('modal-root')
const ModalContext = createContext({
  showToast: (text: String) => {},
})

const ModalProvider = styled(({ children, className }) => {
  const [toastContent, setToastContent] = useState(null)
  const showToast = useCallback((text) => setToastContent(text), [setToastContent])
  const onToastDismiss = useCallback(() => setToastContent(null), [setToastContent])

  return (
    <ModalContext.Provider value={{ showToast }}>
      <>
        {ReactDOM.createPortal((
          <div className={className}>
            {toastContent && <Toast children={toastContent} onDismiss={onToastDismiss} />}
          </div>
        ), modalRoot as Element)}
        {children}
      </>
    </ModalContext.Provider>
  )
})`
  pointer-events: none;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
`

export {
  ModalContext,
  ModalProvider,
}
