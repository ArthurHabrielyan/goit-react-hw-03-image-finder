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

  handlerForSubmit = (searchQuerry) => {
    this.setState({ searchImage: searchQuerry });
  };

  handlerForPerPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  onLoadImage = (isMoreImage) => {
    const { searchImage, currentPage, arrOfResult } = this.state;
    this.setState({ isLoading: true });

    getData(searchImage, currentPage)
      .then(({ hits }) => {
        this.setState({
          arrOfResult: isMoreImage
            ? hits.map(({ id, webformatURL, largeImageURL }) => ({
                id,
                webformatURL,
                largeImageURL,
              }))
            : [
                ...arrOfResult,
                ...hits.map(({ id, webformatURL, largeImageURL }) => ({
                  id,
                  webformatURL,
                  largeImageURL,
                })),
              ],
        });
      })
      .catch((error) => this.setState({ error }));

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
      this.setState({ currentPage: 1 });
      this.onLoadImage(true);
    }
    if (currentPage !== prevPage) {
      this.onLoadImage();
    }
  }

  render() {
    const show = this.state.arrOfResult.length > 0;
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
