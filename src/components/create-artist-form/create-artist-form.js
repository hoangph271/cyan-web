import React, { useState } from 'react'
import styled from 'styled-components'

const CreateArtistForm = props => {
  const { className } = props
  const [name, setName] = useState('')

  return (
    <form className={className}>
      <h3>{'Create artist...?'}</h3>
      <label htmlFor="name" />
      <input id="name" value={name} onChange={setName} />
    </form>
  )
}

export default styled(CreateArtistForm)`
`
