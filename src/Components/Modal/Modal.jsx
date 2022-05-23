import { Component } from "react";
import { createPortal } from "react-dom";
import style from "./Modal.module.css";
const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onCloseModal);
  }

  onCloseModal = (event) => {
    if (event.code === "Escape") {
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
