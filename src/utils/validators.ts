const validateUploadArtist = ({ title } : { title?: string } = {}) => {
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

const isValidArtist = (props : { id?: string, title?: string }) => {
  const { id, title } = props

  if (typeof id !== 'string' || id.length === 0) {
    return false
  }

  if (typeof title !== 'string' || title.length === 0) {
    return false
  }

  return true
}

const validateUploadSong = (props : { title?: string, audio?: File, artists?: Array<Object> } = {}) => {
  const { title, audio, artists } = props

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

  if (Array.isArray(artists)) {
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

const createFieldError = (fieldName: string, message: string) => ({
  fieldName,
  message,
})

export {
  validateUploadArtist,
  validateUploadSong,
}