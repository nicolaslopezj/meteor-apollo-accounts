import hasService from './Mutation/oauth/hasService'

export default function (options) {
  const mutations = []

  if (hasService('password')) {
    mutations.push(`
    type Mutation {
      # Log the user in with a password.
      loginWithPassword (username: String, email: String, password: HashedPassword, plainPassword: String): LoginMethodResponse
      
      # Log the user in with a token
      loginWithToken (token: String!): LoginMethodResponse

      # Create a new user.
      createUser (username: String, email: String, password: HashedPassword, plainPassword: String, profile: CreateUserProfileInput): LoginMethodResponse

      # Change the current user's password. Must be logged in.
      changePassword (oldPassword: HashedPassword!, newPassword: HashedPassword!): SuccessResponse

      # Request a forgot password email.
      forgotPassword (email: String!): SuccessResponse

      # Reset the password for a user using a token received in email. Logs the user in afterwards.
      resetPassword (newPassword: HashedPassword!, token: String!): LoginMethodResponse
    }`)
  }

  mutations.push(`
  type Mutation {
    # Log the user out.
    logout (token: String!): SuccessResponse

    # Marks the user's email address as verified. Logs the user in afterwards.
    verifyEmail (token: String!): LoginMethodResponse

    # Send an email with a link the user can use verify their email address.
    resendVerificationEmail (email: String): SuccessResponse
  }`)

  if (hasService('facebook')) {
    mutations.push(`
    type Mutation {
      # Login the user with a facebook access token
      loginWithFacebook (accessToken: String!): LoginMethodResponse
    }`)
  }

  if (hasService('google')) {
    mutations.push(`
    type Mutation {
      # Login the user with a facebook access token
      loginWithGoogle (accessToken: String!, tokenId: String): LoginMethodResponse
    }`)
  }

  if (hasService('linkedin')) {
    mutations.push(`
    type Mutation {
      # Login the user with a facebook access token
      loginWithLinkedIn (code: String!, redirectUri: String!): LoginMethodResponse
    }`)
  }

  return mutations
}
