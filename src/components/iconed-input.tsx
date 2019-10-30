import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import { generateUUID } from '../utils'

const maskableInputTypes = [
  'file',
]

type IconedInputProps = {
  className?: string,
  value?: string,
  type?: string,
  title?: string,
  accept?: string,
  iconUrl?: string,
  placeholder?: string,
  id?: string,
  onChange?: (e: React.SyntheticEvent) => void,
}
const IconedInput = (props: IconedInputProps, forwardedRef: React.Ref<HTMLInputElement> | null) => {
  const { value, className, title, accept, placeholder, onChange } = props
  const { type = 'text', id = generateUUID() } = props

  const [maskText, setMaskText] = useState(type === 'file' ? 'No file choosen' : undefined)
  const selfRef = useRef<HTMLInputElement>(null)

  const inputClassName = `iconed-input ${maskableInputTypes.includes(type) ? 'file-mask' : ''}`
  const ref = forwardedRef as React.RefObject<HTMLInputElement> || selfRef

  const handleInputChange = (e: React.SyntheticEvent) => {
    onChange && onChange(e)

    if (maskableInputTypes.includes(type)) {
      const maskText = ref.current && ref.current.files && ref.current.files[0]
        ? ref.current.files[0].name
        : 'No file choosen'

      setMaskText(maskText)
    }
  }

  return (
    <div className={className}>
      <label className="iconed-label" htmlFor={id} title={title} />
      <input
        id={id}
        type={type}
        ref={ref}
        value={value}
        accept={accept}
        placeholder={placeholder}
        data-mask-text={maskText}
        className={inputClassName}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default styled(React.forwardRef<HTMLInputElement, IconedInputProps>(IconedInput))`
  box-shadow: ${props => props.theme.shallowShadow};
  background-color: #2d3436;
  justify-content: center;
  border-radius: 0.2rem;
  margin: 0.5rem 0.2rem;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  height: 2rem;

  &:focus-within {
    box-shadow: ${props => props.theme.deepShadow};
  }

  .iconed-label {
    background-image: url(${(props: IconedInputProps) => props.iconUrl});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
    flex-basis: 2rem;
    cursor: pointer;
  }

  .iconed-input {
    border-bottom-right-radius: ${props => props.theme.shalowRadius};
    border-top-right-radius: ${props => props.theme.shalowRadius};
    padding: 0 0.4rem;
    flex-basis: 0;
    min-width: 0;
    flex-grow: 1;
    border: none;
  }
  .iconed-input:focus {
    outline: none;
  }

  .file-mask {
    position: relative;
    border: none;
  }
  .file-mask::before {
    content: attr(data-mask-text);
    text-overflow: ellipsis;
    background-color: #fff;
    align-items: center;
    white-space: nowrap;
    position: absolute;
    padding: 0 0.4rem;
    cursor: pointer;
    display: flex;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
  }
`
