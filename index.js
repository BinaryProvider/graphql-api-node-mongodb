const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const graphql = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Event = require('./models/event');
const User = require('./models/user');

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

    type User {
      _id: ID!
      email: String!
      password: String
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
    rootValue: {
      events: () => {
        return Event.find()
          .then(events => {
            return events.map(event => {
              return { ...event._doc };
            });
          })
          .catch(err => {
            throw err;
          });
      },
      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date)
        });

        return event
          .save()
          .then(result => {
            console.log(result);
            return { ...result._doc };
            //.doc leaves all meta data out
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
      createUser: args => {
        return User.findOne({ email: args.userInput.email })
          .then(user => {
            if (user) {
              throw new Error('User already exists.');
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then(hashedPassword => {
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword
            });

            return user.save();
          })
          .then(result => {
            return { ...result._doc, password: null };
          })
          .catch(err => {
            throw err;
          });
      }
    },
    graphiql: true
  })
);

server.get('/', (request, response, next) => {
  response.send('Server up and running');
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@graphql-cluster-omvn0.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
