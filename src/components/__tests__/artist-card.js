import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'

import ArtistCard from '../artist-card'
import { DefaultThemeProvider } from '../../providers/theme-provider'

const withDefaultTheme = (children) => (
  <DefaultThemeProvider>
    {children}
  </DefaultThemeProvider>
)

it('renders without crashing', () => {
  const artist = { title: 'title' }

  shallow(withDefaultTheme(<ArtistCard artist={artist} />))
})

it('renders artist avatar & title', () => {
  const artist = { title: 'title' }

  const wrapper = mount(withDefaultTheme(<ArtistCard artist={artist} />))

  expect(wrapper.find('div.avatar')).to.have.lengthOf(1)
  expect(wrapper.find('.title').text()).to.equal(artist.title)
})
