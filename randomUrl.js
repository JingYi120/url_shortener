function randomUrl(){
  const item = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let collection = ''

  for (i = 0; i < 5; i++) {
    collection += item[Math.floor(Math.random() * item.length)]
  }

  return collection
}

module.exports = randomUrl