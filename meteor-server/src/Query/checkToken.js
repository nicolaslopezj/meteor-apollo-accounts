import {Accounts} from 'meteor/accounts-base'
import {Meteor} from 'meteor/meteor'

export default async function (root, { token }, context) {
  let userId = null;

  const user = await Meteor.users.findOne({
    _id: context.userId,
    'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(token),
  }, {
    fields: {
      _id: 1,
      'services.resume.loginTokens.$': 1,
    },
  });

  if (user) {
    const loginToken = user.services.resume.loginTokens[0];
    const expiresAt = Accounts._tokenExpiration(loginToken.when);
    const isExpired = expiresAt < new Date();

    if (!isExpired) {
      userId = user._id;
    }
  }
  return {
    success: !!userId,
    userId
  };
}
