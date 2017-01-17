import './checkNpm'
import SchemaTypes from './Auth'
import SchemaMutations from './Mutations'
import SchemaQueries from './Queries'
import Mutation from './Mutation'
import Query from './Query'
import LoginMethodResponse from './LoginMethodResponse'
import callMethod from './callMethod'
import {loadSchema} from 'graphql-loader'

const initAccounts = function (givenOptions) {
  const defaultOptions = {
    CreateUserProfileInput: 'name: String'
  }
  const options = {
    ...defaultOptions,
    ...givenOptions
  }

  const typeDefs = [SchemaTypes(options), ...SchemaMutations(options), ...SchemaQueries(options)]
  const resolvers = {...Mutation(options), ...LoginMethodResponse(options), ...Query(options)}

  loadSchema({typeDefs, resolvers})
}

export {
  callMethod,
  initAccounts
}
