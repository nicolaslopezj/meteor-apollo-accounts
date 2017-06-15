import gql from 'graphql-tag'
import {getClient} from './store'

export default async function ({email}) {
  const result = await getClient().mutate({
    mutation: gql`mutation resendVerificationEmail($email: String) {
      resendVerificationEmail(email: $email) {
        success
      }
    }`,
    variables: {
      email
    }
  })

  const {success} = result.data.resendVerificationEmail
  return success
}
