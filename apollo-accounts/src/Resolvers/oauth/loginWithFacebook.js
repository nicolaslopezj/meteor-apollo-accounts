import resolver from './resolver'
import {Facebook} from 'meteor/facebook'

const handleAuthFromAccessToken = function ({accessToken}) {
  // works with anything also...
  const expiresIn = 1000
  const oauthResult = Facebook.handleAuthFromAccessToken(accessToken, (new Date()) + (1000 * expiresIn))
  return {
    serviceName: 'facebook',
    serviceData: oauthResult.serviceData,
    options: oauthResult.options
  }
}

export default resolver(handleAuthFromAccessToken)
