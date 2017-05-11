import loginWithFacebook from './loginWithFacebook'
import loginWithGoogle from './loginWithGoogle'
import loginWithLinkedIn from './loginWithLinkedIn'
import hasService from './hasService'

export default function (options) {
  const oauth = {}

  if (hasService(options, 'facebook')) {
    oauth.loginWithFacebook = loginWithFacebook
  }

  if (hasService(options, 'google')) {
    oauth.loginWithGoogle = loginWithGoogle
  }

  if (hasService(options, 'linkedin')) {
    oauth.loginWithLinkedIn = loginWithLinkedIn
  }

  return oauth
}
