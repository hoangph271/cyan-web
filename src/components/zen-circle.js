import React from 'react'
import styled from 'styled-components'

import zen from '../assets/png/zen.png'

const ZenCircle = ({ className, text = '' }) => {
  return (
    <span className={className}>
      {text === '' ? (
        <span className="zen-icon" />
      ) : (
        <>
          <span className="zen-text">
            {text}
          </span>
          <span className="zen-icon" />
        </>
      )}
    </span>
  )
}

export default styled(ZenCircle)`
  flex-direction: column;
  display: flex;

  .zen-icon {
    animation: rotate-loop 0.6s linear infinite;
    background-image: url(${zen});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: inline-block;
    min-height: 25px;
    min-width: 25px;

    @keyframes rotate-loop {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  }
`
