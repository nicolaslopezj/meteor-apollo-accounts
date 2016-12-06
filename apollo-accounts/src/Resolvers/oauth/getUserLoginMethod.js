import {Accounts} from 'meteor/accounts-base'

export default function (email) {
  if (!email) return 'unknown'
  const {services} = email.indexOf('@') !== -1 ? Accounts.findUserByEmail(email) : Accounts.findUserByUsername(email)
  const list = []
  for (const key in services) {
    if (key === 'email') continue
    if (key === 'resume') continue
    list.push(key)
  }
  return list.join(', ')
}
