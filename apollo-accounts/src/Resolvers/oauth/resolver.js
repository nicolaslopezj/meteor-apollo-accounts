import callMethod from '../../callMethod'

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
    return callMethod(context, 'login', {oauth})
  }
}
