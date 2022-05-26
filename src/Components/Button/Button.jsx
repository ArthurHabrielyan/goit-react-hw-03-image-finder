import React from "react";
import style from "./Button.module.css";
import PropTypes from "prop-types";

export const Button = ({ onClick }) => (
  <div className={style.footer}>
    <button className={style.button} onClick={onClick}>
      Load more
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
