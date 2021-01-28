import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildASTSchema } from 'graphql'
import gql from 'graphql-tag'
import { PEOPLE, POSTS, initializeData } from './mockData.js'

const app = express()

// SCHEMA
const schema = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(id: ID): Post
    authors: [Person]
    author(id: ID): Person
  }
  type Post {
    id: ID
    author: Person
    body: String
  }
  type Person {
    id: ID
    posts: [Post]
    firstName: String
    lastName: String
  }
`)

// RESOLVER
const rootValue = {
  posts: () => POSTS.values(),
  post: ({ id }) => POSTS.get(id),
  authors: () => PEOPLE.values(),
  author: ({ id }) => PEOPLE.get(id),
}

initializeData()

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
