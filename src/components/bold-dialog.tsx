import React, { ReactNode } from 'react'
import styled from 'styled-components'

type BoldDialogProps = {
  className?: string,
  children?: ReactNode,
  title?: string,
  onClose?: () => void,
  onConfirm?: () => void,
}

const BoldDialog = (props: BoldDialogProps, forwardedRef: React.Ref<HTMLDialogElement> | null) => {
  const { children, className, title = 'Dialog', onClose } = props

  return (
    <dialog className={className} ref={forwardedRef}>
      <header className="dialog-header">
        <span className="dialog-title">
          {title}
        </span>
        <button
          className="dialog-close"
          onClick={onClose}
        >
          {'✖'}
        </button>
      </header>
      {children}
    </dialog>
  )
}

export default styled(React.forwardRef<HTMLDialogElement, BoldDialogProps>(BoldDialog))`
  padding: 0.2rem;

  &::backdrop {
    background-color: rgba(45, 52, 54, 0.6);
  }

  .dialog-header {
    background-color: #fdcb6e;
    border: 2px solid #e17055;
    border-radius: 0.2rem;
    display: flex;

    .dialog-title {
      flex-grow: 1;
      cursor: default;
      padding-top: 0.1rem;
      padding-bottom: 0.1rem;
    }
    .dialog-close {
      border: none;
      cursor: pointer;
      background: none;
      border-left: 2px solid #e17055;
    }
    .dialog-close:hover {
      background-color: #e17055;
    }
  }
`