import React, { useState, useCallback } from 'react'

type useInputExtraParam = { transformer?: (value: string) => string }
type useInputReturns = [string, (e: React.SyntheticEvent) => void, (value: string) => void]
const useInput = (initValue: string, { transformer }: useInputExtraParam = {}): useInputReturns => {
  const [value, setValue] = useState(initValue)

  const handleValueChange = useCallback(e => { setValue(e.target.value) }, [])

  return [transformer ? transformer(value) : value, handleValueChange, setValue]
}

export {
  useInput,
}
