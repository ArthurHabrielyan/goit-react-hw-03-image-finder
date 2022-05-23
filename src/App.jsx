import { Component } from "react";
import { Button } from "./Components/Button";
import { ImageGallery } from "./Components/ImageGallery";
import { Searchbar } from "./Components/Searchbar ";
import { getData } from "./api-service";
import { Modal } from "./Components/Modal";

export class App extends Component {
  state = {
    searchImage: "",
    arrOfResult: [],
    currentPage: 1,
    showModal: false,
    isLoading: false,
    largeImageURL: "",
    error: null,
  };

  componentDidMount() {
    const { searchImage, currentPage } = this.state;

    getData(searchImage, currentPage)
      .then((data) => {
        this.setState({ arrOfResult: [...data.hits] });
      })
      .catch((error) => this.setState({ error }))
      .finally(this.setState({ isLoading: false }));
  }

  handlerForSubmit = (searchQuerry) => {
    this.setState({ searchImage: searchQuerry });
  };

  handlerForPerPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  onNewSearch = () => {
    const { searchImage, currentPage } = this.state;
    this.setState({ isLoading: true });

    getData(searchImage, currentPage)
      .then((res) => {
        this.setState({
          arrOfResult: [...res.hits],
        });
      })
      .catch((error) => this.setState({ error }));

    setTimeout(() => this.setState({ isLoading: false }), 500);
  };

  onMoreImage = () => {
    const { searchImage, currentPage, arrOfResult } = this.state;
    this.setState({ isLoading: true });

    getData(searchImage, currentPage).then((res) => {
      this.setState({
        arrOfResult: [...arrOfResult, ...res.hits],
      }).catch((error) => this.setState({ error }));
    });

    setTimeout(() => this.setState({ isLoading: false }), 500);
  };

  onToggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickImg = (event) => {
    const { arrOfResult } = this.state;

    this.setState({
      largeImageURL: arrOfResult.find(
        (img) => event.target.src === img.webformatURL
      ).largeImageURL,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevState.searchImage;
    const nextValue = this.state.searchImage;
    const currentPage = this.state.currentPage;
    const prevPage = prevState.currentPage;

    if (prevValue !== nextValue) {
      this.onNewSearch();
    }
    if (currentPage !== prevPage) {
      this.onMoreImage();
    }
  }

  render() {
    const show = this.state.arrOfResult.length >= 0;
    const { isLoading, arrOfResult, largeImageURL, showModal } = this.state;
    return (
      <>
        <Searchbar isLoading={isLoading} onSubmit={this.handlerForSubmit} />
        {show && (
          <ImageGallery
            arrOfImages={arrOfResult}
            onToggleModal={this.onToggleModal}
            onClickImg={this.onClickImg}
          />
        )}

        {show && <Button onClick={this.handlerForPerPage} />}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onToggleModal={this.onToggleModal}
          />
        )}
      </>
    );
  }
}

export default App;
