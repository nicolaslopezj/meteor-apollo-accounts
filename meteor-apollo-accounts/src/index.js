import changePassword from './changePassword'
import createUser from './createUser'
import forgotPassword from './forgotPassword'
import hashPassword from './hashPassword'
import loginWithPassword from './loginWithPassword'
import logout from './logout'
import resendVerificationEmail from './resendVerificationEmail'
import resetPassword from './resetPassword'
import verifyEmail from './verifyEmail'
import loginWithFacebook from './oauth/loginWithFacebook'
import loginWithGoogle from './oauth/loginWithGoogle'
import userId from './userId'
import {onTokenChange, getLoginToken} from './store'

export {
  changePassword,
  createUser,
  forgotPassword,
  getLoginToken,
  hashPassword,
  loginWithPassword,
  logout,
  resendVerificationEmail,
  resetPassword,
  verifyEmail,
  loginWithFacebook,
  loginWithGoogle,
  onTokenChange,
  userId
}
