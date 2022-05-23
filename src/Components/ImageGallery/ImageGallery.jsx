import { ImageGalleryItem } from "../ImageGalleryItem";
import style from "./ImageGallery.module.css";

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
