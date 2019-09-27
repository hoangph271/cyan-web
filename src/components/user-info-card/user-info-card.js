import React from 'react'
import styled from 'styled-components'

import more from '../../assets/svg/more.png'

const UserInfoCard = props => {
  const { userInfo, className, onSignOut } = props
  const { photoURL, displayName, email, phoneNumber } = userInfo

  return (
    <figure className={className}>
      <img className="profile-image" src={photoURL} alt='User profile' />
      <div className="user-info">
        <h4 className="full-name">
          {displayName}
        </h4>
        <div className="email">
          <span>{'💌'}</span>
          <span>{email}</span>
        </div>
        <div className="phone">
          <span>{'☎'}</span>
          <span>{phoneNumber || 'N/A'}</span>
        </div>
      </div>
      <button
        onClick={onSignOut}
        className="logout-button"
      >
        <img
          className="more-actions-icon"
          src={more}
          alt="Logout"
        />
      </button>
    </figure>
  )
}

export default styled(UserInfoCard)`
  border: 2px solid #dfe6e9;
  box-sizing: border-box;
  border-radius: 0.4rem;
  position: relative;
  overflow: hidden;
  max-width: 100%;
  display: flex;
  height: 10rem;
  margin: 0;

  .profile-image {
    border-bottom-left-radius: 0.4rem;
    border-top-left-radius: 0.4rem;
    max-height: 100%;
  }

  .user-info {
    flex-direction: column;
    padding-right: 0.6rem;
    padding-left: 0.6rem;
    display: flex;

    .full-name {
      justify-content: center;
      align-items: center;
      display: flex;
      flex-grow: 1;
      margin: 0;
    }

    .email, .phone {
      padding: 0.4rem 0;
      text-align: left;
      display: flex;

      span:first-child {
        justify-content: center;
        align-items: center;
        display: flex;
        min-width: 40px;
        width: 2.5rem;
      }
    }
  }

  .logout-button {
    position: absolute;
    border: none;
    background: none;
    padding: 0;
    right: 0;
    top: 0;
    outline: none;

    .more-actions-icon {
      height: 2rem;
      width: 2rem;
      min-height: 30px;
      min-width: 30px;
      cursor: pointer;
    }
  }
`