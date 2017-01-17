import checkToken from './checkToken'

const resolvers = {
  checkToken
}

export default function (options) {
  return { Query: resolvers }
}
