import express from 'express';

import UserController from './app/controllers/UserController';
import QueueController from './app/controllers/QueueController';

const user = new UserController();
const queue = new QueueController();

const route = express.Router();

route.get('/', (req, res) => {
  res.status(200).json({ msg: 'server OK!' });
});

route.post('/createUser', user.store);
route.post('/addToLine/:_id', queue.store);
route.get('/findPosition/:email', queue.findUserInQueue);
route.get('/showLine', queue.index);
route.get('/filterLine/:genre', queue.findByGenre);
route.delete('/popLine', queue.destroy);

export default route;
