const tokenDidChange = function () {
  // Looking for a better way to refetch all queries
  // window.location.reload(0)
}

export const storeLoginToken = function (userId, token, tokenExpires) {
  global.localStorage['Meteor.userId'] = userId
  global.localStorage['Meteor.loginToken'] = token
  global.localStorage['Meteor.loginTokenExpires'] = tokenExpires
  tokenDidChange()
}

export const getLoginToken = function () {
  return global.localStorage['Meteor.loginToken']
}

export const resetStore = function () {
  storeLoginToken('', '', '')
}
