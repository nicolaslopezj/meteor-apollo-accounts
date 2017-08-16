export default function (options) {
  return `
# Type returned when the user logs in
type LoginMethodResponse {
  # Id of the user logged in user
  id: String!
  # Token of the connection
  token: String!
  # Expiration date for the token
  tokenExpires: Float!
  # The logged in user
  user: User
}

input CreateUserProfileInput {
  ${options.CreateUserProfileInput}
}

type SuccessResponse {
  # True if it succeeded
  success: Boolean
}

type CheckTokenResponse {
  # True if token was valid
  success: Boolean
  # userId of logged in user, null if not logged in
  userId: String
}

# A hashsed password
input HashedPassword {
  # The hashed password
  digest: String!
  # Algorithm used to hash the password
  algorithm: String!
}
`
}
