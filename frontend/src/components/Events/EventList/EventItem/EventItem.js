import React from 'react';

const EventItem = (props) => {
  return (
    <li key={props.eventId}>
      <h1>{props.title}</h1>
      <h2>
        ${props.price} - {new Date(props.date).toLocaleDateString()}
      </h2>
      {props.userId === props.creatorId ? (
        <div>You are the creator</div>
      ) : (
        <button onClick={props.onDetail.bind(this, props.eventId)}>
          view details
        </button>
      )}
    </li>
  );
};

export default EventItem;
