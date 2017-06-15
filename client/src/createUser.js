import hashPassword from './hashPassword'
import gql from 'graphql-tag'
import {handleLoginCallback, getClient} from './store'

export default async function ({username, email, password, profile}) {
  let result
  try {
    result = await getClient().mutate({
      mutation: gql`
      mutation createUser ($username: String, $email: String, $password: HashedPassword!, $profile: CreateUserProfileInput) {
        createUser (username: $username, email: $email, password: $password, profile: $profile) {
          id
          token
          tokenExpires
        }
      }
      `,
      variables: {
        username,
        email,
        password: hashPassword(password),
        profile
      }
    })
  } catch (err) {
    return handleLoginCallback(err)
  }

  return handleLoginCallback(null, result.data.createUser)
}
