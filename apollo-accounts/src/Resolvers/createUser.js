import callMethod from '../callMethod'

export default function (root, options, context) {
  return callMethod(context, 'createUser', options)
}
