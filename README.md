# Meteor Apollo Accounts

A implementation of Meteor Accounts only in GraphQL with Apollo.

It's compatible with Meteor default accounts and you can use both at the same time.

## Examples

- [janikvonrotz/meteor-apollo-accounts-example](https://github.com/janikvonrotz/meteor-apollo-accounts-example): Meteor client and server side.

# Installing

### Install on Meteor server

```sh
meteor add nicolaslopezj:apollo-accounts
```

Load schema Types

```js
import {SchemaTypes as Auth} from 'meteor/nicolaslopezj:apollo-accounts'
import Query from './Query.graphql'
import Mutation from './Mutation'

export default [
  Auth,
  Query,
  Mutation
]
```

Load Mutation schema

```js
import {SchemaMutations as Auth} from 'meteor/nicolaslopezj:apollo-accounts'

export default `
type Mutation {
  ${Auth}
}
`
```

Load auth resolvers into your Mutation resolver

```js
import {Resolvers as Auth} from 'meteor/nicolaslopezj:apollo-accounts'

export default {
  Mutation: {
    ...Auth
  }
}
```

### Install on your apollo app (may or may not be the same app)

```sh
npm install meteor-apollo-accounts
```

# Methods

Meteor accounts methods, client side only. All methods are promises.

#### loginWithPassword

Log the user in with a password.

```js
import { loginWithPassword } from 'meteor-apollo-accounts'

loginWithPassword({username, email, password}, apollo)
```

- ```username```: Optional. The user's username.

- ```email```: Optional. The user's email.

- ```password```: The user's password.

- ```apollo```: Apollo client instance.

#### changePassword

Change the current user's password. Must be logged in.

```js
import { changePassword } from 'meteor-apollo-accounts'

changePassword({oldPassword, newPassword}, apollo)
```

- ```oldPassword```: The user's current password. This is not sent in plain text over the wire.

- ```newPassword```: A new password for the user. This is not sent in plain text over the wire.

- ```apollo```: Apollo client instance.

#### logout

Log the user out.

```js
import { logout } from 'meteor-apollo-accounts'

logout(apollo)
```

- ```apollo```: Apollo client instance.

#### createUser

Create a new user.

```js
import { createUser } from 'meteor-apollo-accounts'

createUser({username, email, password}, apollo)
```

- ```username```: A unique name for this user.

- ```email```: The user's email address.

- ```password```: The user's password. This is not sent in plain text over the wire.

- ```apollo```: Apollo client instance.

#### verifyEmail

Marks the user's email address as verified. Logs the user in afterwards.

```js
import { verifyEmail } from 'meteor-apollo-accounts'

verifyEmail({token}, apollo)
```

- ```token```: The token retrieved from the verification URL.

- ```apollo```: Apollo client instance.


#### forgotPassword

Request a forgot password email.

```js
import { forgotPassword } from 'meteor-apollo-accounts'

forgotPassword({email}, apollo)
```

- ```email```: The email address to send a password reset link.

- ```apollo```: Apollo client instance.

#### resetPassword

Reset the password for a user using a token received in email. Logs the user in afterwards.

```js
import { resetPassword } from 'meteor-apollo-accounts'

resetPassword({newPassword, token}, apollo)
```

- ```newPassword```: A new password for the user. This is not sent in plain text over the wire.

- ```token```: The token retrieved from the reset password URL.

- ```apollo```: Apollo client instance.
