import React, { useContext } from 'react'
import styled from 'styled-components'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { MinWidths } from '../../utils/constants'
import { AuthContext } from '../../utils/context'

import NavBar from '../../components/nav-bar'
import ZenCircle from '../../components/zen-circle'

import ListAll from './list-all'
import UploadSong from './upload-song'
import UserDetails from './user-details'
import CreateArtist from './create-artist'

const links = [
  { text: 'Auth', url: 'auth' },
  { text: 'Create Artist', url: 'create-artist' },
  { text: 'List All', url: 'list-all' },
  { text: 'Upload Song', url: 'upload-song' },
]

const UploaderHome = (props = {}) => {
  const { className } = props

  const { roles } = useContext(AuthContext)
  const { url } = useRouteMatch()

  if (roles === null) {
    return (
      <main className={className} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <ZenCircle text="Authorizing...!" />
      </main>
    )
  }

  return (
    <div className={className}>
      <NavBar
        links={links}
        className={className}
        selected={3}
      />
      <Switch>
        <Route path={`${url}/auth`} component={UserDetails} />
        <Route path={`${url}/create-artist`} component={CreateArtist} />
        <Route path={`${url}/upload-song`}component={UploadSong} />
        <Route component={ListAll} />
      </Switch>
    </div>
  )
}

export default styled(UploaderHome)`
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
