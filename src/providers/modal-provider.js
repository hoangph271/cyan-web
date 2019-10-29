import React, { useState, useCallback, createContext } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

import Toast from '../components/toast'

const ModalContext = createContext({
  showToast: _ => {},
})

const ModalProvider = styled(({ children, className }) => {
  const [toastContent, setToastContent] = useState(null)
  const onToastDismiss = useCallback(_ => setToastContent(null), [setToastContent])

  return (
    <ModalContext.Provider
      value={{
        showToast: setToastContent,
      }}
    >
      <>
        {ReactDOM.createPortal((
          <div className={className}>
            {toastContent && <Toast children={toastContent} onDismiss={onToastDismiss} />}
          </div>
        ), document.getElementById('modal-root'))}
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
