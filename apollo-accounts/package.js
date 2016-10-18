Package.describe({
  name: 'nicolaslopezj:apollo-accounts',
  version: '1.0.1',
  // Brief, one-line summary of the package.
  summary: 'Meteor accounts in GraphQL',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/nicolaslopezj/meteor-apollo-accounts',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.4.1.2')
  api.use('check')
  api.use('accounts-base')
  api.use('npm-bcrypt')
  api.use('ecmascript')
  api.use('random')
  api.use('orionsoft:graphql-compiler@0.0.1')
  api.mainModule('src/index.js')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('nicolaslopezj:apollo-accounts')
})
