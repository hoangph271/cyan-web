import React from 'react'
import styled from 'styled-components'

import RoundedImage from '../../components/rounded-image'

import noimage from '../../assets/png/no-image.png'

const ArtistCard = (props = {}) => {
  const { className, artist } = props
  const { avatarURL, title } = artist

  return (
    <div className={className}>
      <RoundedImage
        width="80px"
        height="80px"
        src={avatarURL}
        className={`avatar ${avatarURL ? '' : 'no-avatar'}`}
      />
      <div>{title}</div>
    </div>
  )
}

export default styled(ArtistCard)`
  height: 6rem;
  display: flex;

  .avatar {
    min-width: 30%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .no-avatar {
    background-size: contain;
  }
`