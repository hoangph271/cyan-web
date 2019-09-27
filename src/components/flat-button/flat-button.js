import styled from 'styled-components'

export default styled.button`
background: ${props => props.primary ? 'black' : 'white'};
color: ${props => props.primary ? 'white' : 'black'};
font-size: 1em;
padding: 0.25em 1em;
border: 2px solid black;
border-radius: 3px;
cursor: pointer;

:hover {
  transformation: scale(1.02);
}
`
