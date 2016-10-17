import hashPassword from './hashPassword'
import gql from 'graphql-tag'
import {storeLoginToken} from './store'

export default async function (selector, password, apollo) {
  if (typeof selector === 'string') {
    if (selector.indexOf('@') === -1) {
      selector = {username: selector}
    } else {
      selector = {email: selector}
    }
  }

  const result = await apollo.mutate({
    mutation: gql`
    mutation login($methodArguments: JSON) {
      login(methodArguments: $methodArguments) {
        id
        token
        tokenExpires
      }
    }
    `,
    variables: {
      methodArguments: {
        user: selector,
        password: hashPassword(password)
      }
    }
  })

  const {id, token, tokenExpires} = result.data.login
  storeLoginToken(id, token, new Date(tokenExpires))
  console.log('Logged in as', id)
  return id
}
