import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images, onModal }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => {
        return (
          <ImageGalleryItem key={image.id} image={image} onModal={onModal} />
        );
      })}
    </ul>
  );
};
