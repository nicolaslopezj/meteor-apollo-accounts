export default function (options) {
  const queries = []

  queries.push(`
  type Query {
    # Returns success: true and userId if auth token is valid
    checkToken: CheckTokenResponse
  }`)

  return queries
}
