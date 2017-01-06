import callMethod from '../callMethod'
import hashPassword from './hashPassword'
import {Meteor} from 'meteor/meteor'

export default async function (root, options, context) {
  console.log('hello world')
  Meteor._nodeCodeMustBeInFiber()
  if (!options.password && !options.plainPassword) {
    throw new Error('Password is required')
  }
  if (!options.password) {
    options.password = hashPassword(options.plainPassword)
    delete options.plainPassword
  }
  console.log('will call method')
  const result = callMethod(context, 'createUser', options)
  console.log(result)
  return result
}
