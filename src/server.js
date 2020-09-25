import App from './app';

const app = new App().express;

app.listen(process.env.PORT || 3333, () => {
  console.log('server OK!');
});
