import styled from 'styled-components'

export default styled.button`
  background: ${props => props.primary ? 'black' : 'white'};
  color: ${props => props.primary ? 'white' : 'black'};
  color: ${props => props.disabled ? 'gray' : ''};
  border: 2px solid ${props => props.disabled ? 'gray' : 'black'};
  padding: 0.25em 1em;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1em;

  :hover {
    transform: scale(${props => props.disabled ? '1' : '1.02'});
  }
`
