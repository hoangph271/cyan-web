import React, { ReactNode, SyntheticEvent } from 'react'
import styled from 'styled-components'

type CardProps = {
  className?: string,
  type?: string,
  children?: ReactNode,
  onClick?: (e: SyntheticEvent) => void,
  onContextMenu?: (e: SyntheticEvent) => void,
}

const Card = (props: CardProps) => {
  const { className, type, children, onClick, onContextMenu } = props

  const classNames = [className, type]
    .filter(Boolean)
    .join(' ')

  return (
    <article
      className={classNames}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {children}
    </article>
  )
}

export default styled(Card)`
  border-radius: ${props => props.theme.shalowRadius};
  box-shadow: ${props => props.theme.shallowShadow};
  padding: ${props => props.theme.shallowPadding};
  flex-direction: column;
  display: inline-flex;
  cursor: pointer;

  &:hover {
    box-shadow: ${props => props.theme.deepShadow};
  }
  &.selected {
    box-shadow: ${props => props.theme.deepCurrentShadow};
  }
  &.using {
    box-shadow: ${props => props.theme.deepSelectedShadow};
  }
`
