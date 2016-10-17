import {Accounts} from 'meteor/accounts-base'
import {Random} from 'meteor/random'

export default function (root, {token}, context) {
  try {
    Accounts._setLoginToken(context.userId, Random.id(), null)
    if (token && context.userId) {
      Accounts.destroyToken(context.userId, token)
    }
    Accounts._successfulLogout(null, context.userId)
    return {
      success: true
    }
  } catch (e) {
    return {
      success: false
    }
  }
}
