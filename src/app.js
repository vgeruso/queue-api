import express from 'express';
import route from './routes';

export default class App {
  constructor() {
    this.express = express();

    this.middleware();
    this.routes();
  }

  middleware() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use('/api', route);
  }
}
