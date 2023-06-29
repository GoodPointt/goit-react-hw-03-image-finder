import { GalleryListItem, GalleryListItemImage } from 'components/Styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ onImgClick, searchResult }) => {
  return (
    searchResult &&
    searchResult.map(({ id, tags, webformatURL, largeImageURL }) => (
      <GalleryListItem key={id} onClick={() => onImgClick(largeImageURL, tags)}>
        <GalleryListItemImage src={webformatURL} alt={tags} />
      </GalleryListItem>
    ))
  );
};

ImageGalleryItem.propTypes = {
  onImgClick: PropTypes.func.isRequired,
  searchResult: PropTypes.arrayOf(PropTypes.shape(PropTypes.string.isRequired))
    .isRequired,
};
