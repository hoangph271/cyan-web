import React, { useEffect, ReactNode } from 'react'
import styled from 'styled-components'

const TOAST_DURATION_MS = 3 * 1000

type ToastProps = {
  children?: ReactNode,
  className?: string,
  onDismiss?: () => void,
}
const Toast = (props: ToastProps = {}) => {
  const { className, children } = props
  const { onDismiss = () => {} } = props

  useEffect(() => {
    const timeout = setTimeout(onDismiss, TOAST_DURATION_MS)

    return () => clearTimeout(timeout)
  }, [onDismiss, children])

  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default styled(Toast)`
  animation: fadein 0.5s, fadeout 0.5s ${TOAST_DURATION_MS}ms;
  background-color: #333;
  margin-left: -125px;
  text-align: center;
  border-radius: 2px;
  min-width: 250px;
  font-size: 17px;
  position: fixed;
  padding: 16px;
  bottom: 30px;
  color: #fff;
  left: 50%;

  @keyframes fadein {
    from { bottom: 0; opacity: 0; }
    to { bottom: 30px; opacity: 1; }
  }
  @keyframes fadeout {
    from { bottom: 30px; opacity: 1; }
    to { bottom: 0; opacity: 0; }
  }
`
