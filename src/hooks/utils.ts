import { useState, useCallback } from 'react'

const useInput = (initValue: string, { transformer = (value: string) => value } = {}) => {
  const [value, setValue] = useState(initValue)

  const handleValueChange = useCallback(e => setValue(e.target.value), [])

  return [transformer(value), handleValueChange, setValue]
}

export {
  useInput,
}
