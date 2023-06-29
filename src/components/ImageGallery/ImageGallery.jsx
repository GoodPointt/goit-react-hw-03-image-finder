import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button, ImageGalleryList } from 'components/Styled';
import { BASE_URL, API_KEY, perPage } from 'api/api';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import { Component } from 'react';

export class ImageGallery extends Component {
  state = {
    currentPage: 1,
    searchResult: [],
    total: null,
    showLoadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.props.loaderToggle(true);

      this.setState({
        currentPage: 1,
        searchResult: [],
        showLoadMore: false,
      });

      this.fetchImgs(BASE_URL, API_KEY, perPage);
    }

    if (this.state.currentPage !== prevState.currentPage) {
      this.props.loaderToggle(true);
      this.fetchImgs(BASE_URL, API_KEY, perPage);
    }

    if (this.state.total !== prevState.total) {
      toast.success(
        `We found ${this.state.total} ${this.props.searchQuery}s for you`
      );
    }

    if (
      this.state.searchResult.length !== prevState.searchResult.length &&
      prevState.searchResult.length !== 0
    ) {
      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollPosition = scrollHeight - clientHeight;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }

  fetchImgs = async (BASE_URL, API_KEY, perPage) => {
    const SEARCH_URL = `${BASE_URL}?q=${this.props.searchQuery}&page=${this.state.currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    try {
      const res = await fetch(SEARCH_URL);
      if (res.ok) {
        const { hits, total } = await res.json();
        if (hits.length === 0) {
          this.props.loaderToggle(false);
          toast.warn(
            `Sorry! But nothing found by your query "${this.props.searchQuery}"`
          );
        } else {
          this.setState(prevState => ({
            searchResult: [...prevState.searchResult, ...hits],
            total,
            showLoadMore: total / this.state.currentPage > 12,
          }));
        }
      } else {
        throw new Error('Oops! 😒');
      }
    } catch (error) {
      toast.error(`Sorry! But something go wrong ${error.message}`);
    } finally {
      this.props.loaderToggle(false);
    }
  };

  loadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    const { showLoadMore, searchResult } = this.state;
    return (
      <>
        <ImageGalleryList>
          {searchResult &&
            searchResult.map(searchResultEl => (
              <ImageGalleryItem
                key={searchResultEl.id}
                onImgClick={this.props.onImgClick}
                searchResultEl={searchResultEl}
              />
            ))}
        </ImageGalleryList>

        {showLoadMore && (
          <Button type="button" onClick={this.loadMore}>
            Load more...
          </Button>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  onImgClick: PropTypes.func.isRequired,
  loaderToggle: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
