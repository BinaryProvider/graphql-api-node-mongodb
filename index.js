const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const server = express();

server.use(bodyParser.json());

server.get('/', (request, response, next) => {
  response.send('Server up and running');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
