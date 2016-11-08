import callMethod from '../../callMethod'
import getUserLoginMethod from './getUserLoginMethod'

export default function (handleAuthFromAccessToken) {
  return function (root, params, context) {
    const Random = global.Random
    const OAuth = global.OAuth

    const oauthResult = handleAuthFromAccessToken(params)
    // Why any token works? :/
    const credentialToken = Random.secret()
    const credentialSecret = Random.secret()

    OAuth._storePendingCredential(credentialToken, oauthResult, credentialSecret)

    const oauth = {credentialToken, credentialSecret}
    try {
      return callMethod(context, 'login', {oauth})
    } catch (error) {
      if (error.reason === 'Email already exists.') {
        const {email} = oauthResult.serviceData
        const method = getUserLoginMethod(email)
        if (method) {
          throw new Error(`User is registered with ${method}.`)
        } else {
          throw new Error('User has no login methods')
        }
      }
    }
  }
}
