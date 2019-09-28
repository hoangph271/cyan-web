import React from 'react'
import styled from 'styled-components'

import './utils/init-firebase'
import { useAuth, useRoles, useUserDetail } from './hooks'
import { Roles } from './utils/constants'
import FlatButton from './components/flat-button'
import UserInfoCard from './components/user-info-card'
import CreateArtistForm from './components/create-artist-form'

const App = props => {
  const { className } = props
  const roles = useRoles()
  const userDetail = useUserDetail()
  const [authInfo, signIn, signOut] = useAuth()

  const { isAuthenticating, signInError } = authInfo

  if (isAuthenticating) {
    return (
      <div className={`App ${className}`}>
        <header className='App-header'>
          {'...'}
        </header>
      </div>
    )
  }

  return (
    <div className={`App ${className}`}>
      <header className='App-header'>
        {authInfo.userInfo ? (
          <UserInfoCard
            className="user-info"
            userInfo={userDetail}
            onSignOut={signOut}
          />
        ) : (
          <div>
            <FlatButton primary onClick={signIn}>
              {'Google Login'}
            </FlatButton>
            {signInError && (
              <div>
                {signInError.message}
              </div>
            )}
          </div>
        )}
      </header>
      <main>
        {roles.includes(Roles.UPLOADER) && (
          <CreateArtistForm />
        )}
      </main>
    </div>
  )
}

export default styled(App)`
  text-align: center;

  .App-header {
    background-color: #282c34;
    font-size: calc(10px + 2vmin);
    justify-content: center;
    flex-direction: column;
    align-items: center;
    display: flex;
    color: white;
  }

  .user-info {
    width: 100%;
    margin: 0.4rem;
  }
`
