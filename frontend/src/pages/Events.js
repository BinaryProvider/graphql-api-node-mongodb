import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';

export default class Events extends Component {
  render() {
    return (
      <>
        <Modal>
          <p>Modal Content</p>
        </Modal>
        <div>
          <button>Create Event</button>
        </div>
      </>
    );
  }
}
