import {getLoginToken, resetStore} from './store'
import gql from 'graphql-tag'

export default async function (apollo) {
  const result = await apollo.mutate({
    mutation: gql`
    mutation logout($token: String!) {
      logout(token: $token) {
        success
      }
    }
    `,
    variables: {
      token: getLoginToken()
    }
  })

  resetStore()
  return result.data.logout.success
}
