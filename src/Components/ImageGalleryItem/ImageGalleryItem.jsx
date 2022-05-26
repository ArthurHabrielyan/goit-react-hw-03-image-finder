import style from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

export const ImageGalleryItem = ({
  webformatURL,
  onToggleModal,
  onClickImg,
}) => {
  return (
    <li className={style.ImageGalleryItem} onClick={onToggleModal}>
      <img
        onClick={onClickImg}
        className={style.ImageGalleryItem__image}
        src={webformatURL}
        alt=""
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  onClickImg: PropTypes.func.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};
