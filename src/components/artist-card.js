import React from 'react'
import styled from 'styled-components'

import RoundedImage from '../components/rounded-image'

const ArtistCard = (props = {}) => {
  const { className, artist } = props
  const { title, avatarURL } = artist

  return (
    <div className={className}>
      <RoundedImage src={avatarURL} className="avatar" />
      <div className="title">{title}</div>
    </div>
  )
}

export default styled(ArtistCard)`
  box-shadow: ${props => props.theme.shallowShadow};
  border: 1px solid rgba(0,0,0,0);
  border-radius: 0.4rem;
  margin: 1.0rem 0;
  padding: 0.6rem;
  display: flex;

  &:hover {
    box-shadow: ${props => props.theme.deepShadow};
    cursor: pointer;
  }

  .avatar {
    margin-right: 0.4rem;
    width: 120px;
  }
  .title {
    text-align: center;
    flex-grow: 1;
  }
`