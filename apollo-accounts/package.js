Package.describe({
  name: 'nicolaslopezj:apollo-accounts',
  version: '1.3.4',
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

  api.use([
    'check',
    'accounts-base',
    'npm-bcrypt',
    'ecmascript',
    'random',
    'facebook',
    'http',
    'random',
    'oauth'
  ], 'server')

  // Optional login methods
  api.use([
    'accounts-password',
    'accounts-facebook',
    'accounts-google'
  ], {weak: true})

  api.mainModule('src/index.js')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('nicolaslopezj:apollo-accounts')
})
