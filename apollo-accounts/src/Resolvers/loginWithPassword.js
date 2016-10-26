import callMethod from '../callMethod'
import hashPassword from './hashPassword'

export default function (root, {username, email, password, plainPassword}, context) {
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
  return callMethod(context, 'login', methodArguments)
}
