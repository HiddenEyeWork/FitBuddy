// import { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import { QUERY_USER } from "../utils/queries";
import { REMOVE_EXERCISE } from "../utils/mutations";
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const { loading, data, error: quErr } = useQuery(QUERY_USER);
  const [removeExercise, { error: muErr }] = useMutation(REMOVE_EXERCISE, {
    refetchQueries: [QUERY_USER],
  });

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (exerciseId) => {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!Auth.loggedIn()) {
      return false;
    }
    try {
      const { data } = await removeExercise({
        variables: { exerciseId }
      })

      // upon success, remove book's id from localStorage
      removeBookId(exerciseId, data.deleteBook._id);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  const userData = data.user;

  console.log(data)

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData?.savedExercises.length
            ? `Viewing ${userData.savedExercises.length} saved ${userData.savedExercises.length === 1 ? 'exercise' : 'exercises'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData?.savedExercises.map((book) => {
            return (
              <Col md="4" key={book.exerciseId}>
                <Card border='dark'>
                  {book.gifUrl ? (
                      <Card.Img src={book.gifUrl} alt={`The cover for ${book.name}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Header className='text-center'>{ book.name }</Card.Header>
                    <Card.Title>Equipment:</Card.Title>
                    <Card.Text>{ book.equipment }</Card.Text>
                    <Card.Title>Target:</Card.Title>
                    <Card.Text>{ book.target }</Card.Text>
                    <Card.Title>secondaryMuscles : </Card.Title>
                    {
                        book.secondaryMuscles.map((item, index) => {
                            return ( <Card.Text key={index}>{index+1}.{ item }</Card.Text> );
                        })
                    }
                    
                    <Card.Title> Instructions: </Card.Title>
                    {
                        book.instructions.map((item, index) => {
                            return ( <Card.Text key={index}>{index+1}.{ item }</Card.Text> );
                        })
                    }
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.exerciseId)}>
                      Delete this Content!
                      </Button>
                      </Card.Body>
                </Card>
            </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;