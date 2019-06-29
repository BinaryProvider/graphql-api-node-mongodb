import React, {Component} from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

import AuthContext from '../context/auth-context';

import EventList from '../components/Events/EventList/EventList';

export default class Events extends Component {
  state = {
    creating: false,
    events: [],
    selectedEvent: null,
  };

  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchEvents();
  }

  startCreateEventHandler = () => {
    this.setState({creating: true});
  };

  modalConfirmHandler = () => {
    this.setState({creating: false});
    const title = this.titleElRef.current.value;
    const price = +this.priceElRef.current.value;
    const date = this.dateElRef.current.value;
    const description = this.descriptionElRef.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const requestBody = {
      query: `
          mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
            createEvent(eventInput: {
              title: $title, 
              description: $description,
              date: $date,
              price: $price
            }) 
            {
              _id
              title
              description
              date
              price
            }
          }
        `,
      variables: {
        title,
        price,
        date,
        description,
      },
    };

    const token = this.context.token;

    fetch('http://localhost:5000/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Failed');
        }
        return response.json();
      })
      .then((responseData) => {
        this.setState((prevState) => {
          const updatedEvents = [...prevState.events];
          updatedEvents.push({
            _id: responseData.data.createEvent._id,
            title: responseData.data.createEvent.title,
            description: responseData.data.createEvent.description,
            date: responseData.data.createEvent.date,
            price: responseData.data.createEvent.price,
            creator: {
              _id: this.context.userId,
            },
          });
          return {events: updatedEvents};
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({creating: false, selectedEvent: null});
  };

  fetchEvents() {
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            date
            price
            creator {
              _id
              email
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
      },
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Failed');
        }
        return response.json();
      })
      .then((responseData) => {
        const events = responseData.data.events;
        if (this.isActive) {
          this.setState({events: events});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showDetailHandler = (eventId) => {
    this.setState((prevState) => {
      const selectedEvent = prevState.events.find((e) => e._id === eventId);
      return {selectedEvent};
    });
  };

  bookEventHandler = () => {
    if (!this.context.token) {
      this.setState({selectedEvent: null});
      return;
    }
    const requestBody = {
      query: `
          mutation BookEvent($id: ID!) {
            bookEvent(eventId: $id) {
              _id
              createdAt
              updatedAt
            }
          }
        `,
      variables: {
        id: this.state.selectedEvent._id,
      },
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
        console.log(responseData);
        this.setState({selectedEvent: null});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
          >
            <form>
              <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef} />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={this.priceElRef} />
              </div>
              <div>
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" ref={this.dateElRef} />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  ref={this.descriptionElRef}
                />
              </div>
            </form>
          </Modal>
        )}
        {this.state.selectedEvent && (
          <Modal
            title={this.state.selectedEvent.title}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.bookEventHandler}
            confirmText={this.context.token ? 'Book' : 'Confirm'}
          >
            <h1>{this.state.selectedEvent.title}</h1>
            <h2>
              {this.state.selectedEvent.price} - {this.state.selectedEvent.date}
            </h2>
            <p>{this.state.selectedEvent.description}</p>
          </Modal>
        )}
        <div>
          <button onClick={this.startCreateEventHandler}>Create Event</button>
        </div>
        <section>
          <EventList
            events={this.state.events}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        </section>
      </>
    );
  }
}
