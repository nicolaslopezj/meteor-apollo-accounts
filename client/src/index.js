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
import loginWithLinkedIn from './oauth/loginWithLinkedIn'
import userId from './userId'
import {
  initWithClient,
  setTokenStore,
  TOKEN_EXPIRES_KEY,
  TOKEN_KEY,
  USER_ID_KEY,
  onTokenChange
} from './store'

export {
  changePassword,
  createUser,
  forgotPassword,
  hashPassword,
  loginWithPassword,
  logout,
  resendVerificationEmail,
  resetPassword,
  verifyEmail,
  loginWithFacebook,
  loginWithGoogle,
  loginWithLinkedIn,
  onTokenChange,
  userId,
  initWithClient,
  setTokenStore,
  TOKEN_EXPIRES_KEY,
  TOKEN_KEY,
  USER_ID_KEY,
}

export default {
  changePassword,
  createUser,
  forgotPassword,
  loginWithPassword,
  logout,
  resendVerificationEmail,
  resetPassword,
  verifyEmail,
  loginWithFacebook,
  loginWithGoogle,
  loginWithLinkedIn,
  onTokenChange,
  userId,
  initWithClient,
  setTokenStore,
  TOKEN_EXPIRES_KEY,
  TOKEN_KEY,
  USER_ID_KEY,
}
