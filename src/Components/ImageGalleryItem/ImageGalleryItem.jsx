import style from "./ImageGalleryItem.module.css";

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
