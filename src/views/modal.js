import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

import { ModalContext } from '../utils/context'

import Toast from '../components/toast'

const Modal = (props = {}) => {
  const { className, children } = props
  const [toastContent, setToastContent] = useState(null)
  const onToastDismiss = useCallback(_ => setToastContent(null), [setToastContent])

  return (
    <ModalContext.Provider value={{ showToast: setToastContent }}>
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
}

export default styled(Modal)`
  pointer-events: none;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
`
