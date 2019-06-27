import React from 'react';

const Modal = props => (
  <div className='modal'>
    <header className='modal__header'>
      <h1>{props.title}</h1>
    </header>
    <section className='modal__content'>{props.children}</section>
    <section className='modal__actions'>
      {props.canCancel && (
        <button className='btn' onClick={props.onCancel}>
          cancel
        </button>
      )}
      {props.canConfirm && (
        <button className='btn' onClick={props.onConfirm}>
          {props.confirmText}
        </button>
      )}
    </section>
  </div>
);

export default Modal;
