import gql from 'graphql-tag'
import Events from './Events'

export const USER_ID_KEY = 'Meteor.userId'
export const TOKEN_KEY = 'Meteor.loginToken'
export const TOKEN_EXPIRES_KEY = 'Meteor.loginTokenExpires'

let _tokenSaved
let _userIdSaved
let _isLoggingIn = true
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
  },
  remove: async function () {
    global.localStorage.removeItem(USER_ID_KEY)
    global.localStorage.removeItem(TOKEN_KEY)
    global.localStorage.removeItem(TOKEN_EXPIRES_KEY)
  }
}

export const setTokenStore = function (newStore) {
  tokenStore = newStore
}

export const initWithClient = function (apolloClientInstance) {
  apollo = apolloClientInstance
  _loadInitialUser()
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
    _tokenSaved = token
    _userIdSaved = id
    Events.notify('onLogin')
    return id
  } else {
    Events.notify('onLoginFailure')
    handleLogout()
    return Promise.reject(err)
  }
}

export const handleLogout = async function () {
  await tokenStore.remove()
  _tokenSaved = null
  _userIdSaved = null
  Events.notify('onLogout')
}

export const _storeLoginToken = async function (userId, token, tokenExpires) {
  return tokenStore.set({userId, token, tokenExpires})
}

const _loadInitialUser = async function () {
  let token = null
  try {
    const store = await tokenStore.get()
    token = store.token
  } catch (error) {
    console.warn('Token Store error: ' + error.message)
  }

  return _checkLogin(token)
}

const _checkLogin = async function (token) {
  _tokenSaved = token
  if (token) {
    startLoggingIn()
    let result
    try {
      result = await getClient().query({
        query: gql`
          query checkToken {
            checkToken {
              success
              userId
            }
          }
        `,
      })
    } catch (err) {
      return handleLoginCallback(err)
    } finally {
      endLoggingIn()
    }

    if (
      result.data &&
      result.data.checkToken &&
      result.data.checkToken.success &&
      result.data.checkToken.userId
    ) {
      _userIdSaved = result.data.checkToken.userId
      Events.notify('onLogin')
      return _userIdSaved
    }
  } else {
    endLoggingIn()
  }
}

export const loggingIn = function () {
  return _isLoggingIn
}

export const onLogin = function (cb) {
  Events.on('onLogin', cb)
}

export const onLoginFailure = function (cb) {
  Events.on('onLoginFailure', cb)
}

export const onLogout = function (cb) {
  Events.on('onLogout', cb)
}

export const startLoggingIn = function () {
  _isLoggingIn = true
}

export const endLoggingIn = function () {
  _isLoggingIn = false
}

export const getLoginToken = () => _tokenSaved
export const getUserId = () => _userIdSaved
