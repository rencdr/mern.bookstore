import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const renderBooks = () => {
    if (loading) {
      return <Spinner />;
    }

    if (books.length === 0) {
      return <p>No books available.</p>;
    }

    if (showType === 'table') {
      return (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publish Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publishYear}</td>
                <td>
                  <Link to={`/edit/${book._id}`}>
                    <AiOutlineEdit /> Edit
                  </Link>{' '}
                  |{' '}
                  <Link to={`/details/${book._id}`}>
                    <BsInfoCircle /> Details
                  </Link>{' '}
                  |{' '}
                  <button onClick={() => handleDeleteBook(book._id)}>
                    <MdOutlineDelete /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (showType === 'list') {
      return (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              {book.title} - {book.author} ({book.publishYear})
            </li>
          ))}
        </ul>
      );
    }
  };


  return (
    <div>
      <div>
        <button onClick={() => setShowType('table')}>Show as Table</button>
        <button onClick={() => setShowType('list')}>Show as List</button>
      </div>
      {renderBooks()}
      <Link to="/books/create">
        <MdOutlineAddBox /> Add New Book
      </Link>
    </div>
  );
};

export default Home;
