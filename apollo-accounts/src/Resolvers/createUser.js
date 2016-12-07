import callMethod from '../callMethod'
import hashPassword from './hashPassword'

export default function (root, options, context) {
  if (!options.password && !options.plainPassword) {
    throw new Error('Password is required')
  }
  if (!options.password) {
    options.password = hashPassword(options.plainPassword)
  }
  return callMethod(context, 'createUser', options)
}
