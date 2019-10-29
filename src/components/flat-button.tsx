import styled from 'styled-components'

interface FlatButtonProps {
  primary?: boolean,
  disabled?: boolean,
}

export default styled.button`
  background: ${(props: FlatButtonProps) => props.primary ? 'black' : 'white'};
  color: ${(props: FlatButtonProps) => props.primary ? 'white' : 'black'};
  color: ${(props: FlatButtonProps) => props.disabled ? 'gray' : ''};
  border: 2px solid ${(props: FlatButtonProps) => props.disabled ? 'gray' : 'black'};
  padding: 0.25em 1em;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1em;

  :hover {
    transform: scale(${(props: FlatButtonProps) => props.disabled ? '1' : '1.02'});
  }
`
