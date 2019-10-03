import React from 'react'
import styled from 'styled-components'

import { MinWidths } from '../../utils/constants'

import TabView from '../../components/tab-view'

import ListAll from './list-all'
import UploadSong from './upload-song'
import UserDetails from './user-details'
import CreateArtist from './create-artist'

const Home = (props = {}) => {
  const { className } = props

  return (
    <TabView
      headers={['Auth', 'Create Artist', 'List All', 'Upload Song']}
      className={className}
      selected={1}
    >
      <UserDetails />
      <CreateArtist />
      <ListAll />
      <UploadSong />
    </TabView>
  )
}

export default styled(Home)`
  max-width: calc(100% - 1rem);
  width: calc(100% - 1rem);
  margin: 0 auto;

  @media ${MinWidths.SMALL} {
    width: 40rem;
  }

  @media ${MinWidths.MEDIUM} {
    width: 50rem;
  }
`
