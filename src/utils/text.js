const generateKeywords = (text = '') => {
  const words = text.split(' ')
  const firstCharOnly = words
    .map(word => word[0])
    .join('')
  const withoutSpaces = words.join('')

  const keywords = [
    text,
    ...words,
    firstCharOnly,
    withoutSpaces,
    ...getAllSubstrings(text),
  ]
    .map(keyword => keyword.trim())
    .map(keyword => keyword.toLowerCase())
    .filter(keyword => keyword !== '')

  return [...new Set(keywords)]
}

const getAllSubstrings = (str = '') => {
  const result = [];

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length + 1; j++) {
      result.push(str.slice(i, j))
    }
  }

  return result
}

export {
  generateKeywords,
}
