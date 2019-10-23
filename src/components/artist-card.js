import React from 'react'
import styled from 'styled-components'

import RoundedImage from '../components/rounded-image'

const ArtistCard = (props = {}) => {
  const { className, artist } = props
  const { onClick = _ => {} } = props
  const { title, avatarURL } = artist

  return (
    <div className={className} onClick={onClick}>
      <RoundedImage src={avatarURL} className="avatar" />
      <div className="title">{title}</div>
    </div>
  )
}

export default styled(ArtistCard)`
  box-shadow: ${props => props.theme.shallowShadow};
  margin: ${props => props.theme.deepMargin};
  border: 1px solid rgba(0,0,0,0);
  flex-direction: column;
  border-radius: 0.4rem;
  display: inline-flex;
  padding: 0.6rem;
  width: 8rem;

  &:hover {
    box-shadow: ${props => props.theme.deepShadow};
    cursor: pointer;
  }

  .avatar {
    width: 100%;
  }
  .title {
    text-align: center;
  }
`