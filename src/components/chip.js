import React from 'react'
import styled from 'styled-components'

const Chip = (props = {}) => {
  const { className, text } = props
  const { onClick = _ => {} } = props

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  )
}

export default styled(Chip)`
  cursor: pointer;
  display: inline-block;
  padding: 0 ${props => props.theme.deepPadding};
  margin: 0 ${props => props.theme.shallowMargin};
  border-radius: ${props => props.theme.deepRadius};
  box-shadow: ${props => props.theme.shallowShadow};

  &:hover {
    box-shadow: ${props => props.theme.deepShadow};
  }
`
