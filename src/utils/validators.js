const validateUploadArtist = ({ title, avatar, dob, pob } = {}) => {
  let isValid = true
  const errors = []

  if (typeof title !== 'string' || title.length === 0) {
    isValid = false
    errors.push(createFieldError('title', `Title must be a NOT empty string`))
  }

  return {
    isValid,
    errors,
  }
}

const isValidArtist = ({ id, title }) => {
  if (typeof id !== 'string' || id.length === 0) {
    return false
  }

  if (typeof title !== 'string' || title.length === 0) {
    return false
  }

  return true
}

const validateUploadSong = ({ title, audio, artists } = {}) => {
  let isValid = true
  const errors = []

  if (typeof title !== 'string' || title.length === 0) {
    isValid = false
    errors.push(createFieldError('title', `Title must be a NOT empty string`))
  }

  // TODO: Check if `audio` is real audio file
  if (audio === undefined) {
    isValid = false
    errors.push(createFieldError('audio', `Audio file is NOT a valid file`))
  }

  const isArtistsAnArray = Array.isArray(artists)

  if (isArtistsAnArray) {
    const invalidArtist = artists.find(artist => !isValidArtist(artist))

    if (invalidArtist !== undefined) {
      isValid = false
      errors.push(createFieldError('artists', `Artists contain an INVALID value`))
    }
  } else {
    isValid = false
    errors.push(createFieldError('artists', `Artists must be an array`))
  }

  return {
    isValid,
    errors,
  }
}

const createFieldError = (fieldName, message) => ({
  fieldName,
  message,
})

export {
  validateUploadArtist,
  validateUploadSong,
}