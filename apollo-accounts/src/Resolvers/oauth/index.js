import loginWithFacebook from './loginWithFacebook'
import loginWithGoogle from './loginWithGoogle'
import hasService from './hasService'

const oauth = {}

if (hasService('facebook')) {
  oauth.loginWithFacebook = loginWithFacebook
}

if (hasService('google')) {
  oauth.loginWithGoogle = loginWithGoogle
}

export default oauth
