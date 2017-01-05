import hashPassword from './hashPassword'
import gql from 'graphql-tag'
import {storeLoginToken} from './store'

export default async function ({username, email, password}, apollo) {
  const result = await apollo.mutate({
    mutation: gql`
    mutation createUser ($username: String, $email: String, $password: HashedPassword!) {
      createUser (username: $username, email: $email, password: $password) {
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

  const {id, token, tokenExpires} = result.data.createUser
  storeLoginToken(id, token, new Date(tokenExpires))
  return id
}
