import gql from './gql'

export default (InputTypes) => {

  let { CreateUserProfileInput } = InputTypes ? InputTypes : {}

  return gql`

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
  ${CreateUserProfileInput ? CreateUserProfileInput : 'name: String'}
}

type SuccessResponse {
  # True if it succeeded
  success: Boolean
}

# A hashsed password
input HashedPassword {
  digest: String!
  algorithm: String!
}
`
}
