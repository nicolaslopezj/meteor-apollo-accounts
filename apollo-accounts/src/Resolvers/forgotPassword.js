import callMethod from '../callMethod'

export default function (root, {email}, context) {
  callMethod(context, 'forgotPassword', {email})
  return {
    success: true
  }
}
