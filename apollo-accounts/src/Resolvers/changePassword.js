import callMethod from '../callMethod'

export default function (root, {oldPassword, newPassword}, context) {
  return callMethod(context, 'changePassword', oldPassword, newPassword)
}
