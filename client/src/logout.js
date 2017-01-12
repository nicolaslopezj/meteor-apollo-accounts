import gql from 'graphql-tag'
import {getLoginToken, handleLogout, getClient} from './store'

export default async function () {
  const result = await getClient().mutate({
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

  await handleLogout()
  return result.data.logout.success
}
