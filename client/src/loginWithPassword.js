import hashPassword from './hashPassword'
import gql from 'graphql-tag'
import {handleLoginCallback, getClient, startLoggingIn, endLoggingIn} from './store'

export default async function ({username, email, password}) {
  startLoggingIn()
  let result
  try {
    result = await getClient().mutate({
      mutation: gql`
      mutation login ($username: String, $email: String, $password: HashedPassword!) {
        loginWithPassword (username: $username, email: $email, password: $password) {
          id
          token
          tokenExpires
        }
      }
      `,
      variables: {
        username,
        email,
        password: hashPassword(password)
      }
    })
  } catch (err) {
    return handleLoginCallback(err)
  } finally {
    endLoggingIn()
  }

  return handleLoginCallback(null, result.data.loginWithPassword)
}
