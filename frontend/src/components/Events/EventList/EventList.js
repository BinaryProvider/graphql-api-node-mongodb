import React from 'react';
import EventItem from './EventItem/EventItem';

const EventList = props => {
  const eventList = props.events.map(event => {
    return (
      <EventItem
        key={event._id}
        eventId={event._id}
        title={event.title}
        price={event.price}
        userId={props.authUserId}
      />
    );
  });

  return <ul>{eventList}</ul>;
};

export default EventList;
