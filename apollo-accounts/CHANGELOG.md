# Changelog

### v1.3.4

- Add some oauth dependencies to only require installation of accounts-xx.
- Fix oauth login not throwing errors.

### v1.3.3

- Add ```accounts-password``` to weak dependencies.

### v1.3.2

- Fix ```Mutation.createUser defined in resolvers, but not in schema```

### v1.3.1

- Don't use graphql-compiler
- Add conditional to password service mutations.

### v1.3.0

- Pass login method in error message when user tries to log in with the incorrect service.

### v1.2.0

- Conditional mutation if service is installed
- Accounts facebook
- Accounts google
