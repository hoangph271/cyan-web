import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

import { useInput } from '../utils/hooks'

import SearchBox from '../components/search-box'
import ZenCircle from '../components/zen-circle'

const RESULT_COUNT_LIMIT = 10

const SearchCollectionForm = (props = {}) => {
  const { className, firebaseCollection, sortField, buildItems } = props
  const { resultLimit = RESULT_COUNT_LIMIT } = props

  const [isSearching, setIsSearching] = useState(true)
  const [keyword, , setKeyword] = useInput('', { transformer: str => str.toLowerCase() })
  const [founds, setFounds] = useState([])

  const handleSearch = useCallback(keyword => setKeyword(keyword), [setKeyword])

  useEffect(_ => {
    let isMounted = true
    setIsSearching(true)

    let firestoreQuery = firebaseCollection().limit(resultLimit)

    sortField && (firestoreQuery = firestoreQuery.orderBy(sortField))
    keyword && (firestoreQuery = firestoreQuery.where('keywords', 'array-contains', keyword))

    firestoreQuery
      .get()
      .then(snapshot => {
        if (isMounted) {
          const founds = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))

          setFounds(founds)
          setIsSearching(false)
        }
      })
      .catch(error => console.error(error) || setIsSearching(false))

    return _ => isMounted = false
  }, [keyword, resultLimit, firebaseCollection, sortField])

  return (
    <div className={className}>
      <SearchBox
        onSearch={handleSearch}
      />
      {isSearching ? (
        <ZenCircle />
      ) : (
        <>
          {buildItems(founds)}
        </>
      )}
    </div>
  )
}

export default styled(SearchCollectionForm)`
`
