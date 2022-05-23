import React from "react";
import style from "./Button.module.css";

export const Button = ({ onClick }) => (
  <div className={style.footer}>
    <button className={style.button} onClick={onClick}>
      Load more
    </button>
  </div>
);
