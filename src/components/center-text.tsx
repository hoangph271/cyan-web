import React from 'react'
import styled from 'styled-components'

type CentetTextProps = { className?: string, text?: string }
const CentetText = (props:CentetTextProps = {}) => {
  const { className, text }= props

  return (
    <div className={className}>
      {text}
    </div>
  )
}

export default styled(CentetText)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
