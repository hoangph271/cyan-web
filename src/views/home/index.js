import React from 'react'
import styled from 'styled-components'

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
  
`
