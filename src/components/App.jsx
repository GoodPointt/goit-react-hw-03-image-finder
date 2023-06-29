import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchForm } from './SearchForm/SearchForm';
import { Modal } from './Modal/Modal';

import { Loader, StyledApp } from './Styled';

import { BallTriangle } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchQuery: '',
    largeImg: { largeImgPath: null, tags: '' },
    showModal: false,
    loading: false,
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

  loaderToggle = bool => {
    this.setState({ loading: bool });
  };

  render() {
    const {
      largeImg: { largeImgPath, tags },
      searchQuery,
      loading,
      showModal,
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
        <ImageGallery
          onImgClick={this.toggleModal}
          loaderToggle={this.loaderToggle}
          searchQuery={searchQuery}
        />

        {showModal && (
          <Modal closeModal={this.toggleModal} showModal={showModal}>
            <img src={largeImgPath} alt={tags} />
          </Modal>
        )}

        <ToastContainer
          position="top-right"
          autoClose={1700}
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
