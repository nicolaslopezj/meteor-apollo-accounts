import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions'

checkNpmVersions({
  'graphql-loader': '1.0.x'
}, 'orionsoft:stripe-graphql')
