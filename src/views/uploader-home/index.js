import React from 'react'
import styled from 'styled-components'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { useAuth } from '../../hooks/auth'
import { MinWidths } from '../../utils/constants'

import CenterText from '../../components/center-text'
import ZenCircle from '../../components/zen-circle'
import NavBar from '../../components/nav-bar'

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

  const { roles } = useAuth()
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
        className="nav-bar"
        selected={3}
      />
      <div className="main-content">
        <Switch>
          <Route path={`${url}/auth`} component={UserDetails} />
          <Route path={`${url}/create-artist`} component={CreateArtist} />
          <Route path={`${url}/list-all`} component={ListAll} />
          <Route path={`${url}/upload-song`} component={UploadSong} />
          <Route
            path={`${url}/`}
            render={_ => (
              <CenterText className="not-found" text="404 | Not Found" />
            )}
          />
        </Switch>
      </div>
    </div>
  )
}

export default styled(UploaderHome)`
  max-width: calc(100% - 1rem);
  width: calc(100% - 1rem);
  flex-direction: column;
  margin: 0 auto;
  display: flex;

  @media ${MinWidths.SMALL} {
    width: 40rem;
  }

  @media ${MinWidths.MEDIUM} {
    width: 50rem;
  }

  .main-content {
    flex-direction: column;
    display: flex;
    flex-grow: 1;

    .not-found {
      flex-grow: 1;
    }
  }
`
