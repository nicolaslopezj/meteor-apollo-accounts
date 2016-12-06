const onChangeCallbacks = []

export const getLoginToken = function () {
  return global.localStorage['Meteor.loginToken']
}

export const getUserId = function () {
  return global.localStorage['Meteor.userId'] || null
}

const tokenDidChange = function () {
  // Looking for a better way to refetch all queries
  // window.location.reload(0)
  for (const callback of onChangeCallbacks) {
    try {
      callback({userId: getUserId(), token: getLoginToken()})
    } catch (error) {
      console.log('Error on onChangeCallback', error)
    }
  }
}

export const onTokenChange = function (callback) {
  onChangeCallbacks.push(callback)
}

export const storeLoginToken = function (userId, token, tokenExpires) {
  global.localStorage['Meteor.userId'] = userId
  global.localStorage['Meteor.loginToken'] = token
  global.localStorage['Meteor.loginTokenExpires'] = tokenExpires
  tokenDidChange()
}

export const resetStore = function () {
  storeLoginToken('', '', '')
}
