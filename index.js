import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const app = express()

// SCHEMA
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// RESOLVER
const rootValue = {
  hello: () => 'Hello, World',
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
