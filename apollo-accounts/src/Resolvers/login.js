import {Accounts} from 'meteor/accounts-base'
import {Meteor} from 'meteor/meteor'
import {Random} from 'meteor/random'

export default function (root, {methodArguments}, context) {
  Meteor._sleepForMs(1000)
  const methodInvocation = {
    connection: {
      id: Random.id()
    },
    setUserId (userId) {
      // nothing to do here
    }
  }
  const handlersResult = Accounts._runLoginHandlers(methodInvocation, methodArguments)
  return Accounts._attemptLogin(methodInvocation, 'login', methodArguments, handlersResult)
}
