import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'

import TabView from '../tab-view'
import { withDefaultTheme } from '../../utils/theme'

it('renders without crashing', () => {
  shallow(withDefaultTheme(<TabView />))
})
it('render correct content according to selected tab', () => {
  const tabNames = ['tab-1', 'tab-2', 'tab-3']
  const wrapper = mount(withDefaultTheme(
    <TabView headers={tabNames} selected={1}>
      <div>{'Tab #1'}</div>
      <div>{'Tab #2'}</div>
      <div>{'Tab #3'}</div>
    </TabView>
  ))

  expect(wrapper.find('.tabview-content').text()).to.equal('Tab #2')
})
it('update content when selected tab change', () => {
  const tabNames = ['tab-1', 'tab-2', 'tab-3']
  const wrapper = mount(withDefaultTheme(
    <TabView headers={tabNames}>
      <div>{'Tab #1'}</div>
      <div>{'Tab #2'}</div>
      <div>{'Tab #3'}</div>
    </TabView>
  ))

  wrapper.find('.nav-item').at(1).simulate('click')
  expect(wrapper.find('.tabview-content').text()).to.equal('Tab #2')
})
