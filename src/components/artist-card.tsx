import React from 'react'
import styled from 'styled-components'

import Card from './card'
import RoundedImage from './rounded-image'

type ArtistCardProps = {
  className?: string,
  artist: Artist,
  onClick: () => void,
}
const ArtistCard = (props: ArtistCardProps) => {
  const { className, artist, onClick } = props
  const { title, avatarURL } = artist

  return (
    <Card className={className} onClick={onClick}>
      <RoundedImage src={avatarURL} className="avatar" />
      <div className="title">{title}</div>
    </Card>
  )
}

export default styled(ArtistCard)`
  margin: ${props => props.theme.deepMargin};
  width: 8rem;

  &:hover {
    box-shadow: ${props => props.theme.deepShadow};
  }

  .avatar {
    width: 100%;
  }
  .title {
    text-align: center;
  }
`
