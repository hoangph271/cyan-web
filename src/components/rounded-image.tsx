import styled from 'styled-components'

import noimage from '../assets/png/no-image.png'

type RoundedImageProps = {
  src?: string,
  alt?: string | null,
}
export default styled.div`
  &::after {
    background-size: ${(props: RoundedImageProps) => props.src ? 'cover' : '70%'};
    background-image: url(${(props: RoundedImageProps) => props.src || noimage});
    box-shadow: ${props => props.theme.insetShadow};
    background-repeat: no-repeat;
    background-position: center;
    padding-bottom: 100%;
    border-radius: 50%;
    display: block;
    content: "";
  }
`
