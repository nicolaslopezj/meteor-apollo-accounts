const defaultOptions = {
  CreateUserProfileInput: 'name: String'
}

export default function (givenOptions = {}) {
  const options = {
    ...defaultOptions,
    ...givenOptions
  }
  return `
# Type returned when the user logs in
type LoginMethodResponse {
  # Id of the user logged in user
  id: String!
  # Token of the connection
  token: String!
  # Expiration date for the token
  tokenExpires: Float!
}

input CreateUserProfileInput {
  ${options.CreateUserProfileInput}
}

type SuccessResponse {
  # True if it succeeded
  success: Boolean
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
