# Meteor Apollo Accounts

A implementation of Meteor Accounts only in GraphQL with Apollo.

It's compatible with Meteor default accounts and you can use both at the same time.

# Installing

# Methods

#### loginWithPassword

Log the user in with a password.

```js
import loginWithPassword from 'meteor-apollo-accounts/client/loginWithPassword'

loginWithPassword({username, email, password}, apollo)
```

- ```username```: Optional. The user's username.

- ```email```: Optional. The user's email.

- ```password```: The user's password.

- ```apollo```: Apollo client instance.

#### changePassword

Change the current user's password. Must be logged in.

```js
import changePassword from 'meteor-apollo-accounts/client/changePassword'

changePassword({oldPassword, newPassword}, apollo)
```

- ```oldPassword```: The user's current password. This is not sent in plain text over the wire.

- ```newPassword```: A new password for the user. This is not sent in plain text over the wire.

- ```apollo```: Apollo client instance.

#### logout

Log the user out.

```js
import logout from 'meteor-apollo-accounts/client/logout'

logout(apollo)
```

- ```apollo```: Apollo client instance.

#### createUser

Create a new user.

```js
import createUser from 'meteor-apollo-accounts/client/createUser'

createUser({username, email, password}, apollo)
```

- ```username```: A unique name for this user.

- ```email```: The user's email address.

- ```password```: The user's password. This is not sent in plain text over the wire.

- ```apollo```: Apollo client instance.

#### verifyEmail

Marks the user's email address as verified. Logs the user in afterwards.

```js
import verifyEmail from 'meteor-apollo-accounts/client/verifyEmail'

verifyEmail({token}, apollo)
```

- ```token```: The token retrieved from the verification URL.

- ```apollo```: Apollo client instance.


#### forgotPassword

Request a forgot password email.

```js
import forgotPassword from 'meteor-apollo-accounts/client/forgotPassword'

forgotPassword({email}, apollo)
```

- ```email```: The email address to send a password reset link.

- ```apollo```: Apollo client instance.

#### resetPassword

Reset the password for a user using a token received in email. Logs the user in afterwards.

```js
import resetPassword from 'meteor-apollo-accounts/client/resetPassword'

resetPassword({newPassword, token}, apollo)
```

- ```newPassword```: A new password for the user. This is not sent in plain text over the wire.

- ```token```: The token retrieved from the reset password URL.

- ```apollo```: Apollo client instance.
