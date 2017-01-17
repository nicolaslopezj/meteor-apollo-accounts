import {Accounts} from 'meteor/accounts-base'
import {Meteor} from 'meteor/meteor'

export default async function (root, { token }, {userId}) {
  const user = Meteor.users.findOne({
    _id: userId,
    'services.resume.loginTokens.hashedToken' : Accounts._hashLoginToken(token)
  });
  return {
    success: !!user
  }
}
