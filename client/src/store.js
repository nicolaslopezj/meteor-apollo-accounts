
const onChangeCallbacks = []
export const USER_ID_KEY = 'Meteor.userId'
export const TOKEN_KEY = 'Meteor.loginToken'
export const TOKEN_EXPIRES_KEY = 'Meteor.loginTokenExpires'

let apollo

let tokenStore = {
  set: async function ({userId, token, tokenExpires}) {
    global.localStorage[USER_ID_KEY] = userId
    global.localStorage[TOKEN_KEY] = token
    global.localStorage[TOKEN_EXPIRES_KEY] = tokenExpires.toString()
  },
  get: async function () {
    return {
      userId: global.localStorage[USER_ID_KEY],
      token: global.localStorage[TOKEN_KEY],
      tokenExpires: global.localStorage[TOKEN_EXPIRES_KEY]
    }
  }
}

export const setTokenStore = function (newStore) {
  tokenStore = newStore
}

export const initWithClient = function (apolloClientInstance) {
  apollo = apolloClientInstance
}

export const getClient = function () {
  if (!apollo) {
    throw new Error('Meteor Apollo Accounts not initialized. Make sure you have called initWithClient(apollo).')
  }
  return apollo
}

export const handleLoginCallback = async function (err, loginMethodResponse) {
  if (!err) { // save user id and token
    const {id, token, tokenExpires} = loginMethodResponse
    await _storeLoginToken(id, token, new Date(tokenExpires))
    return id
  } else {
    resetStore()
    return Promise.reject(err)
  }
}

export const _storeLoginToken = async function (userId, token, tokenExpires) {
  await tokenStore.set({userId, token, tokenExpires})
  await tokenDidChange()
}

export const getLoginToken = async function () {
  const {token} = await tokenStore.get()
  return token
}

export const getUserId = async function () {
  const {userId} = await tokenStore.get()
  return userId
}

const tokenDidChange = async function () {
  const newData = await tokenStore.get()
  for (const callback of onChangeCallbacks) {
    callback(newData)
  }
}

export const onTokenChange = function (callback) {
  onChangeCallbacks.push(callback)
}

export const resetStore = async function () {
  await _storeLoginToken('', '', '')
}
