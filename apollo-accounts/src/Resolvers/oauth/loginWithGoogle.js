import resolver from './resolver'
import HTTP from 'meteor/http'

const handleAuthFromAccessToken = function ({accessToken}) {
  const scopes = getScopes(accessToken)
  const identity = getIdentity(accessToken)

  const serviceData = {
    ...identity,
    accessToken,
    scopes
  }

  return {
    serviceName: 'google',
    serviceData: serviceData,
    options: {profile: {name: identity.name}}
  }
}

const getIdentity = function (accessToken) {
  const HTTP = global.HTTP
  try {
    return HTTP.get('https://www.googleapis.com/oauth2/v1/userinfo', {params: {access_token: accessToken}}).data
  } catch (err) {
    throw new Error('Failed to fetch identity from Google. ' + err.message)
  }
}

const getScopes = function (accessToken) {
  const HTTP = global.HTTP
  try {
    return HTTP.get('https://www.googleapis.com/oauth2/v1/tokeninfo', {params: {access_token: accessToken}}).data.scope.split(' ')
  } catch (err) {
    throw new Error('Failed to fetch tokeninfo from Google. ' + err.message)
  }
}

export default resolver(handleAuthFromAccessToken)
