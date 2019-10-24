import React from 'react'
import styled from 'styled-components'

import SearchSongForm from '../../components/search-song-form'

const ListAll = (props = {}) => {
  const { className } = props

  return (
    <main className={className}>
      <SearchSongForm />
    </main>
  )
}

export default styled(ListAll)`
`
