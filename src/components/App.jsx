import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchForm } from './SearchForm/SearchForm';
import { Modal } from './Modal/Modal';
import { BASE_URL, API_KEY, perPage } from 'api/api';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { BallTriangle } from 'react-loader-spinner';
import { Button, Loader, StyledApp } from './Styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchQuery: '',
    currentPage: 1,
    searchResult: [],
    showModal: false,
    loading: false,
    largeImg: { largeImgPath: null, tags: '' },
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({
        currentPage: 1,
        loading: true,
      });
      this.fetchImgs(BASE_URL, API_KEY, perPage);
    }

    if (this.state.currentPage !== prevState.currentPage) {
      this.setState({
        loading: true,
      });
      this.fetchImgs(BASE_URL, API_KEY, perPage);
    }
  }

  fetchImgs = (BASE_URL, API_KEY, perPage) => {
    const SEARCH_URL = `${BASE_URL}?q=${this.state.searchQuery}&page=${this.state.currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    fetch(SEARCH_URL)
      .then(res => res.json())
      .then(({ hits }) => {
        if (hits.length === 0) {
          this.setState({
            loading: false,
          });
          return toast.warn(
            `Sorry! But nothing found by your query "${this.state.searchQuery}"`
          );
        }
        this.setState({
          searchResult: hits,
          loading: false,
        });
      })
      .catch(error =>
        toast.error(`Sorry! But something go wrong ${error.message}`)
      );
  };

  toggleModal = (img, alts) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImg: { largeImgPath: img, tags: alts },
    }));
  };

  onSearch = e => {
    e.preventDefault();
    const searchInput = e.currentTarget.elements[1].value.trim();
    if (searchInput === '') {
      toast.info('Enter search query fisrst!');
      return;
    }
    this.setState({ searchQuery: searchInput });
  };

  loadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    const {
      searchResult,
      largeImg: { largeImgPath, tags },
      loading,
    } = this.state;

    return (
      <StyledApp>
        {loading && (
          <Loader>
            <BallTriangle
              height={200}
              width={200}
              radius={5}
              color="lightgray"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={loading}
            />
          </Loader>
        )}
        <SearchForm onSearch={this.onSearch} />
        <ImageGallery>
          <ImageGalleryItem
            onImgClick={this.toggleModal}
            searchResult={searchResult}
          />
        </ImageGallery>

        {searchResult.length > 11 && (
          <Button type="button" onClick={this.loadMore}>
            Load more...
          </Button>
        )}

        {this.state.showModal && (
          <Modal closeModal={this.toggleModal}>
            <img src={largeImgPath} alt={tags} />
          </Modal>
        )}

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </StyledApp>
    );
  }
}
