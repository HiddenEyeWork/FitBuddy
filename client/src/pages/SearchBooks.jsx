import { useState, useEffect } from 'react';
import { useMutation } from "@apollo/client";
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

import { SAVE_EXERCISE } from "../utils/mutations";

const SearchBooks = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState([]);
  const [userId, setUserId] = useState('');

  const [saveExercise, { error: muErr }] = useMutation(SAVE_EXERCISE);

  useEffect(() => {
    if (Auth.loggedIn()) {
      const {data: {_id}} = Auth.getProfile();
      setUserId(_id);
      setSavedBookIds(getSavedBookIds(_id));
    }
  }, []);

  useEffect(() => {
    saveBookIds(savedBookIds, userId);
  }, [savedBookIds]);


  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
        const response = await searchGoogleBooks(searchInput);

        // const bookData = items.map((book) => ({
        //   bookId: book.id,
        //   authors: book.volumeInfo.authors || ['No author to display'],
        //   title: book.volumeInfo.title,
        //   description: book.volumeInfo.description,
        //   image: book.volumeInfo.imageLinks?.thumbnail || '',
        // }));
        
        var data = JSON.parse(response);

        const exerciseData = data.map((item) => ({
            id: item.id,
            name: item.name,
            equipment: item.equipment,
            bodyPart: item.bodyPart,
            gifUrl: item.gifUrl,
            target: item.target,
            secondaryMuscles: item.secondaryMuscles,
            instructions: item.instructions
        }));

        setSearchedBooks(exerciseData);
        setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.id === bookId);

    console.log(bookToSave);
    // get token
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!userId) {
    //   return false;
    // }

    try {
      // const response = await saveBook(bookToSave, token);
      await saveExercise({
        variables: { ...bookToSave },
      });

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
        <div className="text-light bg-dark p-5">
            <Container>
            <h1>Select Category!</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Row>
                        <Col xs={12} md={8}>
                            {/* <Form.Control
                            name='searchInput'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            type='text'
                            size='lg'
                            placeholder='Select a category'
                            /> */}
                            <Form.Select
                                name='searchInput'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                size='lg'
                                aria-label='Select a category'
                            >
                                <option value=''>Select a category</option>
                                <option value='back'>back</option>
                                <option value='cardio'>cardio</option>
                                <option value='chest'>chest</option>
                                <option value='lower arms'>lower arms</option>
                                <option value='lower legs'>lower legs</option>
                                <option value='neck'>neck</option>
                                <option value='shoulders'>shoulders</option>
                                <option value='upper arms'>upper arms</option>
                                <option value='upper legs'>upper legs</option>
                                <option value='upper waist'>upper waist</option>
                                {/* Add more options as needed */}
                            </Form.Select>
                        </Col>
                        <Col xs={12} md={4}>
                            <Button type='submit' variant='success' size='lg'>Submit Search</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>

        <Container>
            <h2 className='pt-5'>
                {searchedBooks.length ? `Viewing ${searchedBooks.length} results:` : 'Choose excercise you want'}
            </h2>
            <Row>
                {
                    searchedBooks.map((book) => {
                        return (
                            <Col md="4" key={book.id}>
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
                                    
                                    {
                                        Auth.loggedIn() && (
                                        <Button
                                            disabled={ savedBookIds?.some((savedBookId) => savedBookId === book.id)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveBook(book.id)}>
                                            {savedBookIds?.some((savedBookId) => savedBookId === book.id)
                                            ? 'This book has already been saved!'
                                            : 'Save this Book!'}
                                        </Button>
                                    )}
                                </Card.Body>
                                </Card>
                            </Col>
                        );
                    })
                }
            </Row>
        </Container>
    </>
  );
};

export default SearchBooks;