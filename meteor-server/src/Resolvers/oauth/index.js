import loginWithFacebook from './loginWithFacebook'
import loginWithGoogle from './loginWithGoogle'
import loginWithLinkedIn from './loginWithLinkedIn'
import hasService from './hasService'

const oauth = {}

if (hasService('facebook')) {
  oauth.loginWithFacebook = loginWithFacebook
}

if (hasService('google')) {
  oauth.loginWithGoogle = loginWithGoogle
}

if (hasService('linkedin')) {
  oauth.loginWithLinkedIn = loginWithLinkedIn
}

export default oauth
