import gql from 'graphql-tag'
import {handleLoginCallback, getClient} from './store'

export default async function ({token}) {
  let result
  try {
    result = await getClient().mutate({
      mutation: gql`mutation verifyEmail($token: String!) {
        verifyEmail(token: $token) {
          id
          token
          tokenExpires
        }
      }`,
      variables: {
        token
      }
    })
  } catch (err) {
    return handleLoginCallback(err)
  }

  return handleLoginCallback(null, result.data.verifyEmail)
}
