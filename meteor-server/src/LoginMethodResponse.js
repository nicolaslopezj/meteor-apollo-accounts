import {Meteor} from 'meteor/meteor'

export default function (options) {
  return {
    LoginMethodResponse: {
      user ({id}) {
        return Meteor.users.findOne(id)
      }
    }
  }
}
