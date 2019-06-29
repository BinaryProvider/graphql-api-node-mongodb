import React from 'react';

const BookingList = (props) => {
  return (
    <div>
      <ul>
        {props.bookings.map((booking) => {
          return (
            <li key={booking._id}>
              <div>
                {booking.event.title} - {booking.createdAt}
              </div>
              <div>
                <button onClick={props.onDelete.bind(this, booking._id)}>
                  cancel
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookingList;
