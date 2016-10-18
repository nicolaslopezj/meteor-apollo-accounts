import {Accounts} from 'meteor/accounts-base'

export default function (root, {token}, context) {
  if (token && context.userId) {
    Accounts.destroyToken(context.userId, token)
  }
  Accounts._successfulLogout(null, context.userId)
  return {
    success: true
  }
}
