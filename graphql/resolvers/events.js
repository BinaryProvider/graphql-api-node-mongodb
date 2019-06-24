const Event = require('../../models/event');
const { transformEvent } = require('./merge');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, request) => {
    if (!request.isAuth) {
      throw new Error('Unauthenticated');
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: '5d09415c58bbc362d62e710d'
    });

    let createdEvent;

    try {
      const result = await event.save();

      createdEvent = {
        ...result._doc,
        date: dateToString(event._doc.date),
        creator: user.bind(this, result._doc.creator)
      };

      const creator = await User.findById('5d09415c58bbc362d62e710d');

      if (!creator) {
        throw new Error('User not found.');
      }

      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  }
};
