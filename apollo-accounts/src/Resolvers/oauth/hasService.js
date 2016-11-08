export default function (service) {
  const Package = global.Package

  if (service === 'facebook') {
    return !!Package['accounts-facebook']
  }

  if (service === 'google') {
    return !!Package['accounts-google']
  }

  if (service === 'password') {
    return !!Package['accounts-password']
  }

  return false
}
