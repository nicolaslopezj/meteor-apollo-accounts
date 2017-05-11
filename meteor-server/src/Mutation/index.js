import loginWithPassword from './loginWithPassword'
import logout from './logout'
import changePassword from './changePassword'
import createUser from './createUser'
import verifyEmail from './verifyEmail'
import resendVerificationEmail from './resendVerificationEmail'
import forgotPassword from './forgotPassword'
import resetPassword from './resetPassword'
import oauth from './oauth'
import hasService from './oauth/hasService'

export default function (options) {
  const resolvers = {
    logout,
    verifyEmail,
    resendVerificationEmail,
    ...oauth(options)
  }

  if (hasService(options, 'password')) {
    resolvers.loginWithPassword = loginWithPassword
    resolvers.changePassword = changePassword
    resolvers.createUser = createUser
    resolvers.forgotPassword = forgotPassword
    resolvers.resetPassword = resetPassword
  }

  return {Mutation: resolvers}
}
