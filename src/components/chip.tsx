import React from 'react'
import styled from 'styled-components'

type ChipProps = {
  className?: string,
  children?: React.ReactChildren | string,
  onClick?: () => void,
}
const Chip = (props: ChipProps = {}) => {
  const { className, children } = props
  const { onClick = () => {} } = props

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  )
}

export default styled(Chip)`
  cursor: pointer;
  display: inline-block;
  margin: ${props => props.theme.shallowMargin};
  padding: 0 ${props => props.theme.deepPadding};
  border-radius: ${props => props.theme.deepRadius};
  box-shadow: ${props => props.theme.shallowShadow};

  &:hover {
    box-shadow: ${props => props.theme.deepShadow};
  }
`
