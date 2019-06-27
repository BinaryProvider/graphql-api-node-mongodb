import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

export default class Events extends Component {
  state = {
    creating: false
  };

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
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
                <input type='text' id='title' />
              </div>
              <div>
                <label htmlFor='price'>Price</label>
                <input type='number' id='price' />
              </div>
              <div>
                <label htmlFor='date'>Date</label>
                <input type='date' id='date' />
              </div>
              <div>
                <label htmlFor='description'>Description</label>
                <textarea id='description' rows='4' />
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
