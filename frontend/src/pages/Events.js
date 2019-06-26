import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

export default class Events extends Component {
  render() {
    return (
      <>
        <Backdrop />
        <Modal title='Add Event' canCancel canConfirm>
          <p>Modal Content</p>
        </Modal>
        <div>
          <button>Create Event</button>
        </div>
      </>
    );
  }
}
