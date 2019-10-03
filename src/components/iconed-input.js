import React, { forwardRef, useState, useRef } from 'react'
import styled from 'styled-components'

const maskableInputTypes = [
  'file',
]

const IconedInput = forwardRef((props = {}, forwardedRef) => {
  const { className, onChange = _ => {}, value, type = 'text', title, id = Math.random(), placeholder } = props

  const inputClassName = `iconed-input ${type === 'file' ? 'file-mask' : ''}`
  const selfRef = useRef()

  const ref = forwardedRef || selfRef

  const [maskText, setMaskText] = useState('No file choosen')

  const handleInputChange = e => {
    onChange(e)

    if (maskableInputTypes.includes(type)) {
      const maskText = ref.current && ref.current.files[0]
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
        placeholder={placeholder}
        data-mask-text={maskText}
        className={inputClassName}
        onChange={handleInputChange}
      />
    </div>
  )
})

export default styled(IconedInput)`
  background-color: #282c34;
  justify-content: center;
  border-radius: 0.2rem;
  margin: 0.5rem 0.2rem;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  height: 2rem;

  .iconed-label {
    background-image: url(${props => props.iconUrl});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
    flex-basis: 2rem;
    cursor: pointer;
  }

  .iconed-input {
    border-bottom-right-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    background-color: #fff;
    border: 1px solid #282c34;
    padding: 0 0.4rem;
    flex-basis: 0;
    min-width: 0;
    flex-grow: 1;
  }

  .file-mask {
    position: relative;
    border: none;
  }
  .file-mask::before {
    border-bottom-right-radius: 0.2rem;
    content: attr(data-mask-text);
    border-top-right-radius: 0.2rem;
    text-overflow: ellipsis;
    background-color: #fff;
    border: 1px solid #282c34;
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
