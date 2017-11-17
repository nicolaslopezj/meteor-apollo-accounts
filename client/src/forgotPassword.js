import gql from 'graphql-tag'
import {getClient} from './store'

export default async function ({email}) {
  const result = await getClient().mutate({
    mutation: gql`mutation forgotPassword($email: String!) {
      forgotPassword(email: $email) {
        success
      }
    }`,
    variables: {
      email
    }
  })

  const {success} = result.data.forgotPassword
  return success
}
