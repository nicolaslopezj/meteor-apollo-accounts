import gql from 'graphql-tag'
import {handleLoginCallback, getClient, startLoggingIn, endLoggingIn} from '../store'

/**
 * Pass the accessToken
 * It's recommended to use https://github.com/keppelen/react-facebook-login
 */

export default async function ({code, redirectUri}) {
  startLoggingIn()
  let result
  try {
    result = await getClient().mutate({
      mutation: gql`
      mutation loginWithLinkedIn($code: String! $redirectUri: String!) {
        loginWithLinkedIn(code: $code redirectUri: $redirectUri) {
          id
          token
          tokenExpires
        }
      }
      `,
      variables: { code, redirectUri }
    })
  } catch (err) {
    return handleLoginCallback(err)
  } finally {
    endLoggingIn()
  }

  return handleLoginCallback(null, result.data.loginWithLinkedIn)
}
