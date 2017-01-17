export default function (options) {
  const queries = []

  queries.push(`
  type Query {
    # Returns true if token is valid
    checkToken(token: String!): CheckTokenResponse
  }`)

  return queries
}
