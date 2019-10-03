import React from 'react'
import styled from 'styled-components'

import more from '../assets/png/more.png'
import addphoto from '../assets/png/add-photo.png'

const userInfoPlaceholder = {
  photoURL: addphoto,
  displayName: '...',
  phoneNumber: '...',
  email: '...',
  roles: [],
}

const UserInfoCard = props => {
  const { userInfo, className, onSignOut } = props

  const { photoURL, displayName, email, phoneNumber } = userInfo !== null
    ? userInfo
    : userInfoPlaceholder

  return (
    <figure className={className}>
      {photoURL ? (
        <img
          className="profile-image"
          src={photoURL}
          alt={displayName}
        />
      ) : (
        <div
          className="add-profile-image"
          style={{ backgroundImage: `url(${addphoto})` }}
        />
      )}
      <div className="user-info-text">
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
  border: 2px solid #282c34;
  box-sizing: border-box;
  border-radius: 0.4rem;
  position: relative;
  overflow: hidden;
  max-width: 100%;
  display: flex;
  height: 10rem;
  margin: 0;

  .profile-image, .add-profile-image {
    border-bottom-left-radius: 0.4rem;
    border-top-left-radius: 0.4rem;
    max-height: 100%;
    min-width: 160px;
  }

  .add-profile-image {
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    max-height: 100%;
    cursor: pointer;
  }

  .add-profile-image:hover {
    background-color: #636e72;
    transition: background-color 0.4s ease-out;
  }

  .user-info-text {
    border-left: 1px solid #282c34;
    flex-direction: column;
    padding-right: 0.6rem;
    padding-left: 0.6rem;
    display: flex;
    min-width: 0;

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
      min-width: 0;

      span:first-child {
        justify-content: center;
        align-items: center;
        display: flex;
        min-width: 40px;
        width: 2.5rem;
      }

      span:nth-child(2) {
        text-overflow: ellipsis;
        overflow: hidden;
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
