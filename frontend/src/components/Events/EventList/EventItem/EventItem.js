import React from 'react';

const EventItem = props => {
  return (
    <li key={props.eventId}>
      <h1>{props.title}</h1>
      <h2>{props.price}</h2>
    </li>
  );
};

export default EventItem;
