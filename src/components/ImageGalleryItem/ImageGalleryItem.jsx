import { GalleryItem, GalleryItemImage } from 'components/Styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ onImgClick, searchResult }) => {
  return (
    searchResult &&
    searchResult.map(({ id, tags, webformatURL, largeImageURL }) => (
      <GalleryItem key={id} onClick={() => onImgClick(largeImageURL, tags)}>
        <GalleryItemImage src={webformatURL} alt={tags} />
      </GalleryItem>
    ))
  );
};

ImageGalleryItem.propTypes = {
  onImgClick: PropTypes.func.isRequired,
  searchResult: PropTypes.arrayOf(PropTypes.shape(PropTypes.string.isRequired))
    .isRequired,
};
