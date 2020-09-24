import express from 'express';

import UserController from './app/controllers/UserController';
import QueueController from './app/controllers/QueueController';

const route = express.Router();

route.get('/', (req, res) => {
  res.status(200).json({ msg: 'server OK!' });
});

route.post('/createUser', new UserController().store);
route.get('/addToLine/:_id', new QueueController().store);

export default route;
