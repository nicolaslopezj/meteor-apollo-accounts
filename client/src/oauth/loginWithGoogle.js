import gql from 'graphql-tag'
import {handleLoginCallback, getClient} from '../store'

/**
 * Pass the accessToken
 * It's recommended to use https://github.com/anthonyjgrove/react-google-login
 */

export default async function ({accessToken}) {
  let result
  try {
    result = await getClient().mutate({
      mutation: gql`
      mutation loginWithGoogle ($accessToken: String!) {
        loginWithGoogle (accessToken: $accessToken) {
          id
          token
          tokenExpires
        }
      }
      `,
      variables: {
        accessToken
      }
    })
  } catch (err) {
    return handleLoginCallback(err)
  }

  return handleLoginCallback(null, result.data.loginWithGoogle)
}
