import callMethod from '../callMethod'

export default function (root, {username, email, password}, context) {
  const methodArguments = {
    user: email ? {email} : {username},
    password: password
  }
  return callMethod(context, 'login', methodArguments)
}
