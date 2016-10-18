import {Meteor} from 'meteor/meteor'

export default {
  me (root, {}, {userId}) {
    if (userId) {
      return Meteor.users.findOne(userId)
    }
  }
}
