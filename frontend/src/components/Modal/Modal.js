import React from 'react';

const Modal = props => (
  <div className='modal'>
    <header>{props.title}</header>
    <section className='modal__content'>{props.children}</section>
    <section className='modal__actions'>
      {props.canCancel && <button className='btn'>cancel</button>}
      {props.canConfirm && <button className='btn'>confirm</button>}
    </section>
  </div>
);

export default Modal;
