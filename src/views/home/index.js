import React, { useContext } from 'react'
import styled from 'styled-components'

import { MinWidths } from '../../utils/constants'
import { AuthContext } from '../../utils/context'

import TabView from '../../components/tab-view'
import ZenCircle from '../../components/zen-circle'

import ListAll from './list-all'
import UploadSong from './upload-song'
import UserDetails from './user-details'
import CreateArtist from './create-artist'

const Home = (props = {}) => {
  const { className } = props
  const { roles } = useContext(AuthContext)

  if (roles === null) {
    return (
      <main className={className} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <ZenCircle text="Authorizing...!" />
      </main>
    )
  }

  return (
    <TabView
      headers={['Auth', 'Create Artist', 'List All', 'Upload Song']}
      className={className}
      selected={2}
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
