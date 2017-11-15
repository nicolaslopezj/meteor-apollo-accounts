import gql from 'graphql-tag'
import { handleLoginCallback, getClient, startLoggingIn, endLoggingIn } from '../store'

/**
 * Pass the accessToken
 * It's recommended to use https://github.com/appigram/react-vk-login
 */

export default async function ({code, redirectUri}) {
  startLoggingIn()
  let result
  try {
    result = await getClient().mutate({
      mutation: gql`
      mutation loginWithVK($code: String! $redirectUri: String!) {
        loginWithVK(code: $code redirectUri: $redirectUri) {
          id
          token
          tokenExpires
        }
      }
      `,
      variables: {
        code, redirectUri
      }
    })
  } catch (err) {
    return handleLoginCallback(err)
  } finally {
    endLoggingIn()
  }

  return handleLoginCallback(null, result.data.loginWithVK)
}
