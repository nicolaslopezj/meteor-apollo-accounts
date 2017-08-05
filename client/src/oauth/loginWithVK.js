import gql from 'graphql-tag'
import { storeLoginToken } from '../store'

/**
 * Pass the accessToken
 * It's recommended to use https://github.com/keppelen/react-facebook-login
 */

export default async function ({code, redirectUri}, apollo) {
  const result = await apollo.mutate({
    mutation: gql`
    mutation loginWithVK($code: String! $redirectUri: String!) {
      loginWithVK(code: $code redirectUri: $redirectUri) {
        id
        token
        tokenExpires
      }
    }
    `,
    variables: { code, redirectUri }
  })

  const {id, token, tokenExpires} = result.data.loginWithVK
  await storeLoginToken(id, token, new Date(tokenExpires))
  return id
}
