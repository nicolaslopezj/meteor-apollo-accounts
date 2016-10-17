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
  console.log(result.data.logout.success ? 'Logged out' : 'Error loggin out')
  return result.data.logout.success
}
