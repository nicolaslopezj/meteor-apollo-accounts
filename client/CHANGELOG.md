# Changelog

### vNEXT

- Add `initWithClient(apolloClientInstance)` function to remove need for passing apollo with every function call
- Calling `userId()` is now synchronous and more performant since it's cached in memory
- Added the following hooks/callbacks: `onLogin`, `onLoginFailure`, `onLogout` so the API is similar to Meteor Accounts
- Added `loggingIn` function, similar to Meteor Accounts
- Added support for persisting login automatically. As soon as you call `initWithClient` in your app, it will check for a stored token and attempt to login, calling the `onLogin` callback if it succeeds.

### v2.0.0

- React Native support.
- Return promises in all store functions.

### v1.3.0

- Pass profile to createUser.

### v1.2.0

- Login with linkedin.

### v1.1.2

- Pass userId and token in onTokenChange callback.
- Remove error catcher in onTokenChange callback.

### v1.1.1

- Add userId() function.

### v1.1.0

- onTokenChange callbacks.
- Login with facebook.
- Login with google.

### v1.0.6

- Disable reload on login or logout.
