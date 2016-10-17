import {Meteor} from 'meteor/meteor'
import {check, Match} from 'meteor/check'
import {Accounts} from 'meteor/accounts-base'
import {SHA256} from './hashPassword'
var bcrypt = NpmModuleBcrypt
var bcryptHash = Meteor.wrapAsync(bcrypt.hash)

const passwordValidator = Match.OneOf(
  String,
  { digest: String, algorithm: String }
)

const getPasswordString = function (password) {
  if (typeof password === 'string') {
    password = SHA256(password)
  } else { // 'password' is an object
    if (password.algorithm !== 'sha-256') {
      throw new Error('Invalid password hash algorithm. Only \'sha-256\' is allowed.')
    }
    password = password.digest
  }
  return password
}

const hashPassword = function (password) {
  password = getPasswordString(password)
  return bcryptHash(password, Accounts._bcryptRounds)
}

export default function (root, {oldPassword, newPassword}, context) {
  check(oldPassword, passwordValidator)
  check(newPassword, passwordValidator)

  if (!context.userId) {
    throw new Meteor.Error(401, 'Must be logged in')
  }

  var user = Meteor.users.findOne(context.userId)
  if (!user) {
    throw new Meteor.Error(403, 'User not found')
  }

  if (!user.services || !user.services.password || (!user.services.password.bcrypt && !user.services.password.srp)) {
    throw new Meteor.Error(403, 'User has no password set')
  }

  if (!user.services.password.bcrypt) {
    throw new Meteor.Error(400, 'old password format')
  }

  var result = Accounts._checkPassword(user, oldPassword)
  if (result.error) {
    throw result.error
  }

  const hashedPassword = hashPassword(newPassword)
  const hashedToken = Accounts._hashLoginToken(context.loginToken)
  Meteor.users.update(context.userId, {
    $set: { 'services.password.bcrypt': hashedPassword },
    $pull: {
      'services.resume.loginTokens': { hashedToken: { $ne: hashedToken } }
    },
    $unset: { 'services.password.reset': 1 }
  })

  return { success: true }
}
