import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation saveBook($bookId: String!, $title: String!, $description: String!, $authors: [String], $image: String, $link: String) {
    saveBook(bookId: $bookId, title: $title, description: $description, authors: $authors, image: $image, link: $link) {
      _id
      username
      email
    }
  }
`;

export const SAVE_EXERCISE = gql`
  mutation saveExercise($id: String!, $bodyPart: String!, $name: String!, $equipment: String!, $gifUrl: String!, $target: String!, $secondaryMuscles: [String]!, $instructions: [String]!){
    saveExercise(exerciseId: $id, bodyPart: $bodyPart, name: $name, equipment: $equipment, gifUrl: $gifUrl, target: $target, secondaryMuscles: $secondaryMuscles, instructions: $instructions){
      _id
      username
      email
    }
  }
`;

export const REMOVE_EXERCISE = gql`
  mutation removeExercise($exerciseId: String!){
    removeExercise(exerciseId: $exerciseId){
      username
      email
      bookCount
      savedBooks {
        authors
        description
        bookId
        title
        image
        link
      }
      savedExercises {
        exerciseId
        bodyPart
        name
        equipment
        gifUrl
        target
        secondaryMuscles
        instructions
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        bookId
        title
        image
        link
      }
    }
  }
`;