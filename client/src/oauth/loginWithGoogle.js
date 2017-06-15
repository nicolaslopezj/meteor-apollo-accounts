import gql from 'graphql-tag'
import {handleLoginCallback, getClient, startLoggingIn, endLoggingIn} from '../store'

/**
 * Pass the accessToken
 * It's recommended to use https://github.com/anthonyjgrove/react-google-login
 */

export default async function ({accessToken}) {
  startLoggingIn()
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
  } finally {
    endLoggingIn()
  }

  return handleLoginCallback(null, result.data.loginWithGoogle)
}
