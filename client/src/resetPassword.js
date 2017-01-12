import gql from 'graphql-tag'
import {handleLoginCallback, getClient} from './store'
import hashPassword from './hashPassword'

export default async function ({newPassword, token}) {
  let result
  try {
    result = await getClient().mutate({
      mutation: gql`
      mutation resetPassword($newPassword: HashedPassword!, $token: String!) {
        resetPassword(newPassword: $newPassword, token: $token) {
          id
          token
          tokenExpires
        }
      }`,
      variables: {
        newPassword: hashPassword(newPassword),
        token
      }
    })
  } catch (err) {
    return handleLoginCallback(err)
  }

  return handleLoginCallback(null, result.data.resetPassword)
}
