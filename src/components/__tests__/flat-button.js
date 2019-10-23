import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import { expect } from 'chai'

import FlatButton from '../flat-button'
import { withDefaultTheme } from '../../utils/theme'

it('renders without crashing', () => {
  shallow(withDefaultTheme(<FlatButton />))
})
it('react to click events', () => {
  const handleClick = sinon.spy()
  const wrapper = mount(withDefaultTheme(<FlatButton onClick={handleClick} />))

  wrapper.simulate('click')
  expect(handleClick).to.have.property('callCount', 1)
})
