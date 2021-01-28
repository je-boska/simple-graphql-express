import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildASTSchema } from 'graphql'
import gql from 'graphql-tag'

const app = express()

// SCHEMA
const schema = buildASTSchema(gql`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`)

// RESOLVER
const rootValue = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within'
  },
  random: () => {
    return Math.random()
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6))
  },
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
