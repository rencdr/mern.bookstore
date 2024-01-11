import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

router.get('/', async (request, response) => {
    try {
      const books = await Book.find();
      return response.status(200).send(books);
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: error.message });
    }
  });
  

router.post('/', async (request, response) =>{
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear

        ){
            return response.status(400).send('Send all required fields'); 

        }
        const NewBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear 
        };

        const book = await Book.create(NewBook);

        return response.status(201).send(book);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
        
    }
})

router.delete('/:id', async (request, response) => {
    try {
      const bookId = request.params.id;
  
      const deletedBook = await Book.findByIdAndDelete(bookId);
  
      if (!deletedBook) {
        return response.status(404).send('Book not found');
      }
  
      return response.status(200).send('Book deleted successfully');
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: error.message });
    }
  });
  
  export default router;