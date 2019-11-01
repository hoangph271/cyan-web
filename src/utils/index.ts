const generateUUID = () => {
  let time = new Date().getTime()

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
    const random = (time + Math.random() * 16) % 16 | 0
    time = Math.floor(time / 16)

    const magic = random & 0x3
    return (char === 'x' ? random : (magic | 0x8)).toString(16)
  })

  return uuid
}

export {
  generateUUID,
}
