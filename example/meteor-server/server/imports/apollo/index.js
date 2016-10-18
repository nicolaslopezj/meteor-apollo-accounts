import { createApolloServer } from 'meteor/apollo'
import schema from './schema'
import resolvers from './resolvers'
import cors from 'cors'

createApolloServer({
  schema,
  resolvers
}, {
  configServer: (graphQLServer) => {
    graphQLServer.use(cors())
  }
})
