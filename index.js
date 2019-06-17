const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const graphql = require('graphql');
const PORT = process.env.PORT || 5000;

const server = express();

server.use(bodyParser.json());

server.use(
  '/api',
  graphqlHttp({
    schema: graphql.buildSchema(`
    type Event {
     _id: ID!
     title: String!
     description: String!
     price: Float!
     date: String! 
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
    rootValue: {
      events: () => {
        return [`Romantic Cooking`, 'Sailing', 'All-Night Coding'];
      },
      createEvent: args => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);

server.get('/', (request, response, next) => {
  response.send('Server up and running');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
