const validateArtist = ({ title, avatar, dob, pob } = {}) => {
  let isValid = true
  const errors = []

  if (title.length === 0) {
    isValid = false
    errors.push(createFieldError('title', `Title can't be blank`))
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
  validateArtist,
}