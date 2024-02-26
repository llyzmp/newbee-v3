export const localGet = (key) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch(err) {
    return value
  }
}

export const localSet = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const localRemove = (key) => {
  window.localStorage.removeItem(key)
}