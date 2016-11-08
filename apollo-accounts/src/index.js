import SchemaTypes from './Auth.graphql'
import SchemaMutations from './Mutation'
import Resolvers from './Resolvers'
import callMethod from './callMethod'

/**
 * Resolvers
 */
import loginWithPassword from './Resolvers/loginWithPassword'
import logout from './Resolvers/logout'
import changePassword from './Resolvers/changePassword'
import createUser from './Resolvers/createUser'
import verifyEmail from './Resolvers/verifyEmail'
import resendVerificationEmail from './Resolvers/resendVerificationEmail'
import forgotPassword from './Resolvers/forgotPassword'
import resetPassword from './Resolvers/resetPassword'

export {
  SchemaTypes,
  SchemaMutations,
  Resolvers,
  callMethod,
  /* Also export all resolvers */
  loginWithPassword,
  logout,
  changePassword,
  createUser,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword
}
