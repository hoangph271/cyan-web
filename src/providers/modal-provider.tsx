import React, { useRef, useState, useCallback, createContext, ReactNode } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

import Toast from '../components/toast'

const modalRoot = document.getElementById('modal-root')

type ModalContextProps = {
  showToast: ((text: string) => void),
  showDialog: ((dialogContent: ReactNode) => void),
  closeDialog: () => void,
}
const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)

const ModalProvider = styled(({ children, className }) => {
  const [toastContent, setToastContent] = useState<string | null>(null)
  const [dialogContent, setDialogContent] = useState<ReactNode>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const showToast = useCallback((text: string) => { setToastContent(text) }, [setToastContent])
  const onToastDismiss = useCallback(() => setToastContent(null), [setToastContent])
  const showDialog = useCallback((content: ReactNode) => {
    if (dialogContent !== null) {
      console.error('Another dialog is opening, WTF M8...? :"{')
      return
    }

    setDialogContent(content)
    dialogRef.current!.showModal()
  }, [setDialogContent, dialogContent])
  const closeDialog = useCallback(() => {
    setDialogContent(null)
    dialogRef.current!.close()
  }, [])

  return (
    <ModalContext.Provider value={{ showToast, showDialog, closeDialog }}>
      <>
        {ReactDOM.createPortal((
          <div className={className}>
            {toastContent && <Toast children={toastContent} onDismiss={onToastDismiss} />}
            <dialog className="dialog" ref={dialogRef}>
              {dialogContent}
            </dialog>
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

  .dialog {
    pointer-events: all;
    bottom: 0;
    top: 0;
  }
  .dialog::backdrop {
    background-color: rgba(178, 190, 195, 0.6);
  }
`

export {
  ModalContext,
  ModalProvider,
}
