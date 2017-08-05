import resolver from './resolver'
import {HTTP} from 'meteor/http'
import {ServiceConfiguration} from 'meteor/service-configuration'

const handleAuthFromAccessToken = function ({code, redirectUri}) {
  // works with anything also...
  const accessToken = getAccessToken(code, redirectUri)
  const identity = getIdentity(accessToken)

  const serviceData = {
    ...identity,
    accessToken
  }

  serviceData.id = serviceData.uid;
  delete serviceData.uid;

  serviceData.expiresAt = (+new Date) + (1000 * serviceData.expiresIn);
  delete serviceData.expiresIn;

  return {
    serviceName: 'vk',
    serviceData,
    options: {profile: {name: identity.nickname || (identity.first_name + ' ' + identity.last_name) }}
  }
}

const getTokens = function () {
  const result = ServiceConfiguration.configurations.findOne({service: 'vk'})
  return {
    client_id: result.clientId,
    client_secret: result.secret
  }
}

const getAccessToken = function (code, redirectUri) {
  const response = HTTP.post('https://api.vk.com/oauth/access_token', {
    params: {
      code,
      redirect_uri: redirectUri,
      ...getTokens()
    }
  }).content

  return response.access_token
}

const getIdentity = function (accessToken) {
  try {
    return HTTP.get("https://api.vk.com/method/users.get", {
      params: {
        access_token: accessToken,
        fields: 'uid, nickname, first_name, last_name, sex, bdate, timezone, photo, photo_big, city, country'
    }});
  } catch (err) {
    throw new Error('Failed to fetch identity from VK. ' + err.message)
  }
}

export default resolver(handleAuthFromAccessToken)
