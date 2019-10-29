import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import { expect } from 'chai'

import FlatButton from '../flat-button'
import { DefaultThemeProvider } from '../../providers/theme-provider'

it('renders without crashing', () => {
  shallow(DefaultThemeProvider(<FlatButton />))
})
it('react to click events', () => {
  const handleClick = sinon.spy()
  const wrapper = mount(DefaultThemeProvider(<FlatButton onClick={handleClick} />))

  wrapper.simulate('click')
  expect(handleClick).to.have.property('callCount', 1)
})
