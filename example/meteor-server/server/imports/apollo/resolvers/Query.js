import {Meteor} from 'meteor/meteor'

export default {
  me (root, params, {userId}) {
    if (userId) {
      return Meteor.users.findOne(userId)
    }
  }
}
