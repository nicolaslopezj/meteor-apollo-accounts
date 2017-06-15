import gql from 'graphql-tag'
import hashPassword from './hashPassword'
import {getClient} from './store'

export default async function ({oldPassword, newPassword}) {
  if (!oldPassword || !newPassword) throw new Error('Old and new password are required')

  const result = await getClient().mutate({
    mutation: gql`mutation changePassword($oldPassword: HashedPassword!, $newPassword: HashedPassword!) {
      changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
        success
      }
    }`,
    variables: {
      oldPassword: hashPassword(oldPassword),
      newPassword: hashPassword(newPassword)
    }
  })

  const {success} = result.data.changePassword
  return success
}
