# Meteor Apollo Accounts

A implementation of Meteor Accounts only in GraphQL with Apollo.

This package uses the Meteor Accounts methods in GraphQL, it's compatible with the accounts you have saved in your database and you may use apollo-accounts and Meteor's DPP accounts at the same time.

> Sorry for all the api changes, now we will use [graphql-loader](https://github.com/orionsoft/graphql-loader) for a long term solution.

## Installing

### Install on Meteor server

```sh
meteor add nicolaslopezj:apollo-accounts
yarn add graphql-loader
```

Initialize the package.

```js
import {makeExecutableSchema} from 'graphql-tools'
import {loadSchema, getSchema} from 'graphql-loader'
import {initAccounts} from 'meteor/nicolaslopezj:apollo-accounts'
import typeDefs from './schema'
import resolvers from './resolvers'

const options = {}
// Load all accounts related resolvers and type definitions into graphql-loader
initAccounts(options)

// Load all your resolvers and type definitions into graphql-loader
loadSchema({typeDefs, resolvers})

// Gets all the resolvers and type definitions loaded in graphql-loader
const schema = getSchema()
const executableSchema = makeExecutableSchema(schema)
```


### Install on your apollo app

May or may not be the same app.

```sh
npm install meteor-apollo-accounts
```

## Examples

- [janikvonrotz/meteor-apollo-accounts-example](https://github.com/janikvonrotz/meteor-apollo-accounts-example): Meteor client and server side.
- [orionsoft/server-boilerplate](https://github.com/orionsoft/server-boilerplate): Large Meteor server side only starter app.

## Tutorials
- [Using Meteor With Apollo and React](https://blog.orionsoft.io/using-meteor-accounts-with-apollo-and-react-df3c89b46b17#.znozw2zbd)

## Methods

Meteor accounts methods, client side only. All methods are promises.

#### loginWithPassword

Log the user in with a password.

```js
import { loginWithPassword } from 'meteor-apollo-accounts'

loginWithPassword({username, email, password, plainPassword})
```

- ```username```: Optional. The user's username.

- ```email```: Optional. The user's email.

- ```password```: The hashed user's password.

- ```plainPassword```: Optional. The plain user's password. Recommended only for use in testing tools, like GraphiQL.

- ```apollo```: Apollo client instance.

#### changePassword

Change the current user's password. Must be logged in.

```js
import { changePassword } from 'meteor-apollo-accounts'

changePassword({oldPassword, newPassword})
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

createUser({username, email, password, profile})
```

- ```username```: A unique name for this user.

- ```email```: The user's email address.

- ```password```: The user's password. This is not sent in plain text over the wire.

- ```profile```: The profile object based on the ```UserProfileInput``` input type.

- ```apollo```: Apollo client instance.

#### verifyEmail

Marks the user's email address as verified. Logs the user in afterwards.

```js
import { verifyEmail } from 'meteor-apollo-accounts'

verifyEmail({token})
```

- ```token```: The token retrieved from the verification URL.

- ```apollo```: Apollo client instance.


#### forgotPassword

Request a forgot password email.

```js
import { forgotPassword } from 'meteor-apollo-accounts'

forgotPassword({email})
```

- ```email```: The email address to send a password reset link.

- ```apollo```: Apollo client instance.

#### resetPassword

Reset the password for a user using a token received in email. Logs the user in afterwards.

```js
import { resetPassword } from 'meteor-apollo-accounts'

resetPassword({newPassword, token})
```

- ```newPassword```: A new password for the user. This is not sent in plain text over the wire.

- ```token```: The token retrieved from the reset password URL.

- ```apollo```: Apollo client instance.


#### loginWithFacebook

Logins the user with a facebook accessToken

```js
import { loginWithFacebook } from 'meteor-apollo-accounts'

loginWithFacebook({accessToken})
```

- ```accessToken```: A Facebook accessToken. It's recommended to use
https://github.com/keppelen/react-facebook-login to fetch the accessToken.

- ```apollo```: Apollo client instance.

#### loginWithGoogle

Logins the user with a google accessToken

```js
import { loginWithGoogle } from 'meteor-apollo-accounts'

loginWithGoogle({accessToken})
```

- ```accessToken```: A Google accessToken. It's recommended to use
https://github.com/anthonyjgrove/react-google-login to fetch the accessToken.

- ```apollo```: Apollo client instance.


#### onTokenChange

Register a function to be called when a user is logged in or out.

```js
import { onTokenChange } from 'meteor-apollo-accounts'

onTokenChange(function () {
  console.log('token did change')
  apollo.resetStore()
})
```

#### userId

Returns the id of the logged in user.

```js
import { userId } from 'meteor-apollo-accounts'

async function () {
  console.log('The user id is:', await userId())
}

```


## Contributors

- [@nicolaslopezj](https://github.com/nicolaslopezj)
- [@janikvonrotz](https://github.com/janikvonrotz)
- [@dbrrt](https://github.com/dbrrt)
