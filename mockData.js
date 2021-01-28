export const PEOPLE = new Map()
export const POSTS = new Map()

class Post {
  constructor(data) {
    Object.assign(this, data)
  }
  get author() {
    return PEOPLE.get(this.authorId)
  }
}

class Person {
  constructor(data) {
    Object.assign(this, data)
  }
  get posts() {
    return [...POSTS.values()].filter(post => post.authorId === this.id)
  }
}

export const initializeData = () => {
  const fakePeople = [
    { id: '1', firstName: 'John', lastName: 'Doe' },
    { id: '2', firstName: 'Jane', lastName: 'Doe' },
  ]

  fakePeople.forEach(person => PEOPLE.set(person.id, new Person(person)))

  const fakePosts = [
    { id: '1', authorId: '1', body: 'Hello there, world!' },
    { id: '2', authorId: '2', body: 'Hi, planet!' },
  ]

  fakePosts.forEach(post => POSTS.set(post.id, new Post(post)))
}
