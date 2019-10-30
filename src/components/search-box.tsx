import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useInput } from '../hooks/utils'

import IconedInput from './iconed-input'

import search_white from '../assets/png/search_white.png'

const SEARCH_TIMEOUT_MS = 250

type SearchBoxProps = {
  className?: string,
  onSearch: (keyword: string) => void,
}
const SearchBox = (props: SearchBoxProps) => {
  const { className, onSearch } = props

  const [keyword, onKeywordChange] = useInput('', { transformer: str => str.toLowerCase() })

  useEffect(() => {
    const debounceTimeout = setTimeout(_ => {
      onSearch(keyword)
    }, SEARCH_TIMEOUT_MS)

    return () => { clearTimeout(debounceTimeout) }
  }, [keyword, onSearch])

  return (
    <IconedInput
      value={keyword}
      placeholder="Keyword"
      iconUrl={search_white}
      onChange={onKeywordChange}
      className={'search-box' + className || ''}
    />
  )
}

export default styled(SearchBox)`
  
`
