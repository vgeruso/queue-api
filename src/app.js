import express from 'express';
import route from './routes';

class App {
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

export default new App().express;
