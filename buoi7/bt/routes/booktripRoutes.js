import express from 'express';
import BooktripController from "../controllers/booktripController.js";  // Import BooktripController

const bookrouter = express.Router();

bookrouter.get('/', BooktripController.index);
bookrouter.get('/new', BooktripController.new);
bookrouter.post('/books', BooktripController.create);
bookrouter.get('edit/:id', BooktripController.edit);
bookrouter.post('edit/:id', BooktripController.update);
bookrouter.delete('delete/:id', BooktripController.delete);

export default bookrouter;
