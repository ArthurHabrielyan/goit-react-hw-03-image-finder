import { Component } from "react";
import { createPortal } from "react-dom";
import style from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onCloseModal);
  }

  onCloseModal = ({ code }) => {
    if (code === "Escape") {
      this.props.onToggleModal();
    }
  };

  onBackdropClick = (event) => {
    if (event.target === event.currentTarget) this.props.onToggleModal();
  };

  render() {
    return createPortal(
      <div className={style.overlay} onClick={this.onBackdropClick}>
        <div className={style.modal}>
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
