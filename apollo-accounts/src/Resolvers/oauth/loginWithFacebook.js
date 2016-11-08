import resolver from './resolver'

const handleAuthFromAccessToken = function ({accessToken}) {
  const Facebook = global.Facebook
  if (!Facebook) {
    throw new Error('You need to install the meteor packages "facebook" and "accounts-facebook"')
  }
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
