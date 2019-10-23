import React from 'react'
import styled from 'styled-components'

import SearchArtistForm from '../../components/search-artist-form'

const ListAll = (props = {}) => {
  const { className } = props

  return (
    <main className={className}>
      <SearchArtistForm />
    </main>
  )
}

export default styled(ListAll)`
  .search-box {
    width: calc(100% - 1rem);
  }
`
