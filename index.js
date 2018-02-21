const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./config/routes');
const { env, db, port, secret } = require('./config/environment');
const customResponses = require('./lib/customResponses');
const errorHandler = require('./lib/errorHandler');
const cors = require('cors');
const expressJWT = require('express-jwt');

const app = express();
const environment = app.get('env');

// Stop app from sleeping on Heroku
const http = require('http');
setInterval(() => {
  http.get('http://ga-feedback-george.herokuapp.com');
}, 900000);

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(db[environment], { useMongoClient: true });

app.use(cors());
if (env !== 'test') app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use(
  '/api',
  expressJWT({ secret: secret }).unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  })
);

app.use(jwtErrorHandler);

function jwtErrorHandler(err, req, res, next) {
  if (err.name !== 'UnauthorizedError') return next();
  return res
    .status(401)
    .json({ message: 'You must be logged in to view this content' });
}

app.use(customResponses);
app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

if (environment !== 'test') {
  app.listen(port, () =>
    console.log(`Express is up and running on port: ${port}`)
  );
}

module.exports = app;
