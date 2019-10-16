import styled from 'styled-components'

import noimage from '../assets/png/no-image.png'

export default styled.div`
  &::after {
    background-size: ${props => props.src ? 'cover' : '70%'};
    background-image: url(${props => props.src || noimage});
    box-shadow: inset 0 0 4px #333;
    background-repeat: no-repeat;
    background-position: center;
    padding-bottom: 100%;
    border-radius: 50%;
    display: block;
    content: "";
  }
`
