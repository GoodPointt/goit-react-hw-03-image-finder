import PropTypes from 'prop-types';

import { ModalBackdrop, ModalContent } from 'components/Styled';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);

    this.scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollY}px`;
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);

    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    window.scrollTo(0, this.scrollY);
  }

  handleKeyDown = e => {
    const { closeModal } = this.props;
    if (e.code === 'Escape') closeModal();
  };

  handleBackdropClick = e => {
    const { closeModal } = this.props;
    e.currentTarget === e.target && closeModal();
  };

  render() {
    return createPortal(
      <ModalBackdrop onClick={this.handleBackdropClick}>
        <ModalContent>{this.props.children}</ModalContent>
      </ModalBackdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
