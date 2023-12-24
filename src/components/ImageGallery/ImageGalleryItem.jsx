export const ImageGalleryItem = ({ image, onModal }) => {
  const { largeImageURL, previewURL, tags } = image;
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => onModal(largeImageURL, tags)}
    >
      <img className="ImageGalleryItem-image" src={previewURL} alt={tags} />
    </li>
  );
};
