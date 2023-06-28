import { ImageGalleryList } from 'components/Styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ children }) => {
  return (
    <ImageGalleryList className="ImageGallery">{children}</ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  optionalElement: PropTypes.element,
};
