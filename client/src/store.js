
const onChangeCallbacks = []

let tokenStore = {
  set: async function (userId, token, tokenExpires) {
    global.localStorage['Meteor.userId'] = userId
    global.localStorage['Meteor.loginToken'] = token
    global.localStorage['Meteor.loginTokenExpires'] = tokenExpires.toString()
  },
  get: async function () {
    return {
      userId: global.localStorage['Meteor.userId'],
      token: global.localStorage['Meteor.loginToken'],
      tokenExpires: global.localStorage['Meteor.loginTokenExpires']
    }
  }
}

export const setTokenStore = function (newStore) {
  tokenStore = newStore
}

export const storeLoginToken = function (userId, token, tokenExpires) {
  tokenStore.set({userId, token, tokenExpires})
  tokenDidChange()
}

export const getLoginToken = async function () {
  return await tokenStore.get().token || null
}

export const getUserId = async function () {
  return await tokenStore.get().userId || null
}

const tokenDidChange = function () {
  for (const callback of onChangeCallbacks) {
    callback({userId: getUserId(), token: getLoginToken()})
  }
}

export const onTokenChange = function (callback) {
  onChangeCallbacks.push(callback)
}

export const resetStore = function () {
  storeLoginToken('', '', '')
}
