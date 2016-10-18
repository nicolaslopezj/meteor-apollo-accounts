import {Accounts} from 'meteor/accounts-base'

export default function (root, {email}, {userId}) {
  Accounts.sendVerificationEmail(userId, email)
  return {
    success: true
  }
}
