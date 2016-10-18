import callMethod from '../callMethod'

export default function (root, {token, newPassword}, context) {
  return callMethod(context, 'resetPassword', token, newPassword)
}
