import React from 'react'
import styled from 'styled-components'

import RoundedImage from './rounded-image'

import more from '../assets/png/more.png'
import addphoto from '../assets/png/add-photo.png'

const userInfoPlaceholder = {
  photoURL: addphoto,
  displayName: '...',
  phoneNumber: '...',
  email: '...',
  roles: [],
}

type UserInfoCardProps = {
  className?: string,
  userDetail: UserDetail | null,
  onSignOut: () => void,
}
const UserInfoCard = (props: UserInfoCardProps) => {
  const { userDetail, className, onSignOut } = props

  const { photoURL, displayName, email, phoneNumber } = userDetail || userInfoPlaceholder

  return (
    <figure className={className}>
      {photoURL ? (
        <RoundedImage
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
  border: 1px solid rgba(0,0,0,0);
  box-shadow: 0 0 4px #333;
  box-sizing: border-box;
  flex-direction: column;
  border-radius: 0.4rem;
  border-radius: 0.4rem;
  display: inline-flex;
  position: relative;
  overflow: hidden;
  padding: 0.6rem;
  width: 18rem;

  .profile-image, .add-profile-image {
    max-width: 12rem;
    width: 100%;
    margin: auto;
  }

  .add-profile-image {
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    max-height: 100%;
    cursor: pointer;
  }

  .add-profile-image:hover {
    transition: background-color 0.4s ease-out;
    background-color: #636e72;
  }

  .user-info-text {
    box-sizing: border-box;
    flex-direction: column;
    padding-right: 0.6rem;
    padding-left: 0.6rem;
    display: flex;
    width: 100%;

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
