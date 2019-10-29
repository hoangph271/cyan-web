import React from 'react'
import styled from 'styled-components'

const CentetText = (props = {}) => {
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
