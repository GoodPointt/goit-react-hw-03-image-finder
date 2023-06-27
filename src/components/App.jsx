import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchForm } from './SearchForm/SearchForm';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
  };

  toggleModal = () => {
    console.log('open');
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  onSearch = e => {
    e.preventDefault();
    const searchInput = e.currentTarget.elements[1].value;
    this.setState({ searchQuery: searchInput });
  };

  render() {
    console.log(this.state);
    const { searchQuery } = this.state;
    return (
      <div className="App">
        <SearchForm onSearch={this.onSearch} />
        <ImageGallery openModal={this.toggleModal} />
        <button type="button" className="Button">
          Load more...
        </button>

        {this.state.showModal && (
          <Modal closeModal={this.toggleModal}>
            <p>{searchQuery}</p>
          </Modal>
        )}
      </div>
    );
  }
}
