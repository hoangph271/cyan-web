import React from 'react'
import styled from 'styled-components'

import './utils/init-firebase'
import { useAuth } from './hooks'
import FlatButton from './components/flat-button'
import UserInfoCard from './components/user-info-card'

const App = props => {
  const { className } = props
  const [authInfo, signIn, signOut] = useAuth()
  const { userInfo, isAuthenticating, signInError } = authInfo

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
        {userInfo ? (
          <UserInfoCard
            userInfo={userInfo}
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
    min-height: 100vh;
    display: flex;
    color: white;
  }
`
