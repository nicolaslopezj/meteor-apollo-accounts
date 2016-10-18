import {SchemaTypes as Auth} from 'meteor/nicolaslopezj:apollo-accounts'
import User from './User.graphql'
import Query from './Query.graphql'
import Mutation from './Mutation'
import schema from './schema.graphql'

export default [
  User,
  Auth,
  Query,
  Mutation,
  schema
]
