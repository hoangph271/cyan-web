import React, { useState, useRef, ReactNode } from 'react'
import styled from 'styled-components'

type TabViewProps = {
  className?: string,
  selected?: number,
  headers: string[],
  children: ReactNode[],
}
const TabView = (props: TabViewProps) => {
  const { className, selected = 0, headers = [], children = [] } = props
  const [viewIndex, setViewIndex] = useState(selected)
  const tabView = useRef(null)

  if (headers.length !== children.length) {
    throw new Error(`Number of headers and children must be equal...! :'/`)
  }

  return (
    <div className={className} ref={tabView}>
      <nav className="tabview-nav">
        <ul className="tabview-nav-list">
          {headers.map((header, i) => (
            <li
              className={`nav-item ${i === viewIndex ? 'selected' : ''}`}
              key={`${header}-${i}`}
              onClick={_ => setViewIndex(i)}
            >
              {header}
            </li>
          ))}
        </ul>
      </nav>
      <div className="tabview-content">
        {children.find((_, i) => i === viewIndex)}
      </div>
    </div>
  )
}

export default styled(TabView)`
  flex-direction: column;
  width: 100%;
  display: flex;

  .tabview-nav-list {
    padding: 0;
    display: flex;
    justify-content: space-around;

    .nav-item {
      flex-basis: 0;
      flex-grow: 1;
      list-style: none;
      cursor: pointer;
    }

    .nav-item.selected {
      font-weight: bold;
      cursor: default;
    }
  }

  .tabview-content {
    width: 100%;
  }
`
