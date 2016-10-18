import {SchemaMutations as Auth} from 'meteor/nicolaslopezj:apollo-accounts'

/**
 * We dont use static graphql file because we need to dynamically import accounts mutations
 */

export default `
type Mutation {
  ${Auth}
}
`
