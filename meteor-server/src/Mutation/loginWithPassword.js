import callMethod from '../callMethod'
import hashPassword from './hashPassword'
import getUserLoginMethod from './oauth/getUserLoginMethod'

export default async function (root, {username, email, password, plainPassword}, context) {
  if (!password && !plainPassword) {
    throw new Error('Password is required')
  }
  if (!password) {
    password = hashPassword(plainPassword)
  }

  const methodArguments = {
    user: email ? {email} : {username},
    password: password
  }
  try {
    return callMethod(context, 'login', methodArguments)
  } catch (error) {
    if (error.reason === 'User has no password set') {
      const method = getUserLoginMethod(email || username)
      if (method) {
        throw new Error(`User is registered with ${method}.`)
      } else {
        throw new Error('User has no password set')
      }
    } else {
      throw error
    }
  }
}
