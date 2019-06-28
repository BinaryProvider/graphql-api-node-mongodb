import React, {Component} from 'react';
import AuthContext from '../context/auth-context';

export default class Bookings extends Component {
  state = {
    bookings: [],
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    const requestBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            event {
              _id
              title
              date
            }
          }
        }
      `,
    };

    fetch('http://localhost:5000/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Failed');
        }
        return response.json();
      })
      .then((responseData) => {
        const bookings = responseData.data.bookings;
        this.setState({bookings: bookings});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <ul>
        {this.state.bookings.map((booking) => (
          <li key={booking._id}>
            {booking.event.title} - {booking.createdAt}
          </li>
        ))}
      </ul>
    );
  }
}
