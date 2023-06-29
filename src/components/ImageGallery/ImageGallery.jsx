import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from 'components/Styled';
import PropTypes from 'prop-types';
import { Component } from 'react';

// = ({ onImgClick, searchResult }) =>
export class ImageGallery extends Component {
  render() {
    return (
      <ImageGalleryList>
        {this.props.searchResult &&
          this.props.searchResult.map(searchResultEl => (
            <ImageGalleryItem
              key={searchResultEl.id}
              onImgClick={this.props.onImgClick}
              searchResultEl={searchResultEl}
            />
          ))}
      </ImageGalleryList>
    );
  }
}

// ImageGallery.propTypes = {
//   optionalElement: PropTypes.element,
// };
