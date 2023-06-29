import { GalleryListItem, GalleryListItemImage } from 'components/Styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  onImgClick,
  searchResultEl: { tags, webformatURL, largeImageURL },
}) => {
  return (
    <GalleryListItem onClick={() => onImgClick(largeImageURL, tags)}>
      <GalleryListItemImage src={webformatURL} alt={tags} />
    </GalleryListItem>
  );
};

ImageGalleryItem.propTypes = {
  onImgClick: PropTypes.func.isRequired,
  searchResultEl: PropTypes.shape(PropTypes.string.isRequired).isRequired,
};
