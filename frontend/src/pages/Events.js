import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

export default class Events extends Component {
  state = {
    creating: false
  };

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleElRef.current.value;
    const price = this.priceElRef.current.value;
    const date = this.dateElRef.current.value;
    const description = this.descriptionElRef.current.value;

    if (
      title.trim().length === 0 ||
      price.trim().length === 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const event = { title, price, date, description };
    console.log(event);
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  render() {
    return (
      <>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title='Add Event'
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form>
              <div>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' ref={this.titleElRef} />
              </div>
              <div>
                <label htmlFor='price'>Price</label>
                <input type='number' id='price' ref={this.priceElRef} />
              </div>
              <div>
                <label htmlFor='date'>Date</label>
                <input type='date' id='date' ref={this.dateElRef} />
              </div>
              <div>
                <label htmlFor='description'>Description</label>
                <textarea id='description' rows='4' ref={this.descriptionElRef} />
              </div>
            </form>
          </Modal>
        )}
        <div>
          <button onClick={this.startCreateEventHandler}>Create Event</button>
        </div>
      </>
    );
  }
}
