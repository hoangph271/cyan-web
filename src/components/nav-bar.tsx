import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { NavLink, useRouteMatch } from 'react-router-dom'

interface NavBarProps {
  className?: string,
  links: Array<{ url: string, text: string }>
}
const NavBar = (props: NavBarProps = { links: [] }) => {
  const { className, links } = props
  const { url: matchUrl } = useRouteMatch() || { url: '' }

  return (
    <nav className={className}>
      <ul className="tabview-nav-list">
        {links.map(({ url, text }) => (
          <li key={url} className="nav-li">
            <NavLink className="nav-item" activeClassName="selected" to={`${matchUrl}/${url}`}>
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default styled(NavBar)`
  flex-direction: column;
  width: 100%;
  display: flex;

  .nav-li {
    list-style: none;
  }

  .tabview-nav-list {
    padding: 0;
    display: flex;
    justify-content: space-around;

    .nav-item {
      color: ${props => props.theme.mainColor};
      text-decoration: none;
      cursor: pointer;
      flex-basis: 0;
      flex-grow: 1;
    }

    .nav-item.selected {
      text-decoration: underline;
      font-weight: bold;
      cursor: default;
    }
  }
`
