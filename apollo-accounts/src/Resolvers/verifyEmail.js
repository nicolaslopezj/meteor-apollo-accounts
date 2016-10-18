import callMethod from '../callMethod'

export default function (root, {token}, context) {
  return callMethod(context, 'verifyEmail', token)
}
