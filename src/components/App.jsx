import React from "react";
import "../index.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: false,
      cardInfo: "",
    };
  }

  handleEditAvatarClick = () => {
    this.setState({
      isEditAvatarPopupOpen: true,
    });
  };

  handleEditProfileClick = () => {
    this.setState({
      isEditProfilePopupOpen: true,
    });
  };

  handleAddPlaceClick = () => {
    this.setState({
      isAddPlacePopupOpen: true,
    });
  };

  handleCardClick = (card) => {
    this.setState({
      selectedCard: true,
      cardInfo: card,
    });
  };

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: false,
    });
  };

  render() {
    return (
      <>
        <Header />
        <Main
          onEditProfile={this.handleEditProfileClick}
          onAddPlace={this.handleAddPlaceClick}
          onEditAvatar={this.handleEditAvatarClick}
          onCardClick={this.handleCardClick}
          isEditProfilePopupOpen={this.state.isEditProfilePopupOpen}
          isAddPlacePopupOpen={this.state.isAddPlacePopupOpen}
          isEditAvatarPopupOpen={this.state.isEditAvatarPopupOpen}
          selectedCard={this.state.selectedCard}
          cardInfo={this.state.cardInfo}
          closeAllPopups={this.closeAllPopups}
        />
        <Footer />
      </>
    );
  }
}

export default App;
