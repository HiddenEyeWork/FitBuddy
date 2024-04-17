import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user {
    user {
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