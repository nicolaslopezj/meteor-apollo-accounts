import hasService from './Resolvers/oauth/hasService'
import gql from './gql'

export default gql`
${
  hasService('password') ? gql`
  # Log the user in with a password.
  loginWithPassword (username: String, email: String, password: HashedPassword, plainPassword: String): LoginMethodResponse

  # Create a new user.
  createUser (username: String, email: String, password: HashedPassword!): LoginMethodResponse

  # Change the current user's password. Must be logged in.
  changePassword (oldPassword: HashedPassword!, newPassword: HashedPassword!): SuccessResponse

  # Request a forgot password email.
  forgotPassword (email: String!): SuccessResponse

  # Reset the password for a user using a token received in email. Logs the user in afterwards.
  resetPassword (newPassword: HashedPassword!, token: String!): LoginMethodResponse
  ` : ''
}

# Log the user out.
logout (token: String!): SuccessResponse


# Marks the user's email address as verified. Logs the user in afterwards.
verifyEmail (token: String!): LoginMethodResponse

# Send an email with a link the user can use verify their email address.
resendVerificationEmail (email: String): SuccessResponse

${
  hasService('facebook') ? gql`
  # Login the user with a facebook access token
  loginWithFacebook (accessToken: String!): LoginMethodResponse
  ` : ''
}

${
  hasService('google') ? gql`
  # Login the user with a facebook access token
  loginWithGoogle (accessToken: String!, tokenId: String): LoginMethodResponse
  ` : ''
}
`
