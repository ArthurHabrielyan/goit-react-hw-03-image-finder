import { ImageGalleryItem } from "../ImageGalleryItem";
import style from "./ImageGallery.module.css";
import PropTypes from "prop-types";

export const ImageGallery = ({ arrOfImages, onToggleModal, onClickImg }) => {
  return (
    <ul className={style.ImageGallery}>
      {arrOfImages.length > 0 &&
        arrOfImages.map(({ id, webformatURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              onToggleModal={onToggleModal}
              onClickImg={onClickImg}
            />
          );
        })}
    </ul>
  );
};

ImageGallery.propTypes = {
  arrOfImages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickImg: PropTypes.func.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};
