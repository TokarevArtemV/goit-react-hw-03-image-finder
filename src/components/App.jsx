import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { Watch } from 'react-loader-spinner';
import * as ImageService from './API/Api';

export class App extends Component {
  state = {
    status: 'idle',
    error: null,
    images: [],
    webformatURL: '',
    largeImageURL: '',
    tags: '',
    page: 1,
    query: '',
    showModal: false,
    isEmpty: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        const { hits, totalHits } = await ImageService.getImages(query, page);

        if (hits.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }
        if (hits.length < 12) {
          toast.success(
            "We're sorry, but you've reached the end of search results."
          );
        }
        this.setState(prevState => ({
          status: 'loading',
          images: [...prevState.images, ...hits],
          isLoadMore: page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ status: 'idle' });
      }
    }

    if (
      prevState.largeImageURL !== this.state.largeImageURL &&
      this.state.largeImageURL !== ''
    ) {
      this.setState({ showModal: true });
    }
  }

  //============================== App methods

  loadMoreImages = () => {
    this.setState(prevState => {
      return {
        status: 'loading',
        page: prevState.page + 1,
      };
    });
  };

  handleSerch = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      isLoadMore: false,
      isEmpty: false,
      status: 'loading',
    });
  };

  //============================== App methods Modal

  handlerModal = (largeImageURL, tags) => {
    this.setState({ largeImageURL, tags, status: 'loading' });
  };

  handlerCloseModal = () => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
        largeImageURL: '',
        status: 'idle',
      };
    });
  };

  render() {
    const { images, isLoadMore, showModal, isEmpty, error, status } =
      this.state;

    return (
      <div className="App">
        <Searchbar handleSerch={this.handleSerch} />
        {images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            onModal={this.handlerModal}
          />
        )}
        {isLoadMore && <Button loadMore={this.loadMoreImages} />}
        {showModal && (
          <Modal
            imgSrc={this.state.largeImageURL}
            imgAlt={this.state.tags}
            onCloseModal={this.handlerCloseModal}
          />
        )}
        {error && <p className="textEmpty">Sorry. {error} 😭</p>}
        {isEmpty && (
          <p className="textEmpty">Sorry. There are no images... 😭</p>
        )}
        {status === 'loading' && (
          <Watch
            visible={true}
            height="80"
            width="80"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperStyle={{
              backgroundColor: ' #cbcccd',
              opacity: '0.5',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              width: '100vw',
              position: 'fixed',
              zIndex: '99',
            }}
            wrapperClass=""
          />
        )}
        <ToastContainer autoClose={2000} hideProgressBar={true} theme="light" />
      </div>
    );
  }
}
