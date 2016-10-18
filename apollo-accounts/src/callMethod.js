import {Meteor} from 'meteor/meteor'
import {Random} from 'meteor/random'

export default function (passedContext, name, ...args) {
  const handler = Meteor.default_server.method_handlers[name]
  if (!handler) {
    throw new Meteor.Error(404, `Method '${name}' not found`)
  }

  const context = {
    connection: {
      id: Random.id()
    },
    setUserId (userId) {
      /**
       * This will not make any changes if you don\'t pass setUserId function in context
       */
    },
    ...passedContext
  }

  return handler.call(context, ...args)
}
