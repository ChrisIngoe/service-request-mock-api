'use strict';

const helmet = require('helmet'),
  express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  healthcheck = require('./routes/healthcheck'),
  notFound = require('./routes/notFound'),
  mocks = require('./routes/mocks'),
  cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
app.set('port', port);
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ limit: '10kb', extended: false }));
app.use(helmet());
app.use(cors());

const path = '/';

app.get(path + 'healthcheck', healthcheck.index);
app.get(path + 'mocks/rest/*', mocks.restGet);
app.post(path + 'mocks/rest/*', mocks.restPost);
app.use(notFound.index);

const server = http.createServer(app);
server.listen(app.get('port'), function () {
  //console.info(`Express server listening on port ${port}`);
});

const closeServer = function () {
  //if (err) {console.error('uncaughtException: ' + err);}
  process.exit();
};

process.on('exit', closeServer);
process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
process.on('uncaughtException', closeServer);

module.exports = app;
