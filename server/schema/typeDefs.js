const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    savedExercises: [Exercise]
    bookCount: Int
  }

  type Book {
    _id: ID
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Exercise{
    _id: ID
    exerciseId: String!
    bodyPart: String!
    name: String!
    equipment: String!
    gifUrl: String!
    target: String!
    secondaryMuscles: [String]
    instructions: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookId: String!, title: String!, description: String!, authors: [String], image: String, link: String): User
    deleteBook(bookId: String!): User
    saveExercise(exerciseId: String!, bodyPart: String!, name: String!, equipment: String!, gifUrl: String!, target: String!, secondaryMuscles: [String], instructions: [String]): User
    removeExercise(exerciseId: String!): User
  }
`;

module.exports = typeDefs;