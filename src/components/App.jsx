import React from "react";
import "../index.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import DeletePlacePopup from "./DeletePlacePopup.jsx";
import ImagePopup from "./ImagePopup.jsx";
import Footer from "./Footer.jsx";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: false,
      cardInfo: {},
      cards: [],
      cardToDelete: null,
    };
  }

  getApiUserInfo = async () => {
    try {
      const userInfo = await api.getUserInfo();
      this.setState({
        currentUser: userInfo,
      });
    } catch (e) {
      console.error(e);
    }
  };

  getApiCardsInfo = async () => {
    try {
      const cardsInfo = await api.getInitialCards();
      this.setState({
        cards: cardsInfo,
      });
    } catch (e) {
      console.error(e);
    }
  };

  componentDidMount = () => {
    this.getApiUserInfo();
    this.getApiCardsInfo();
  };

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

  handleCardDeleteClick = (card) => {
    this.setState({
      cardToDelete: card,
    });
  };

  handleUpdateUser = async (name, about) => {
    try {
      await api.createUserInfo(name, about);
      this.setState({
        currentUser: {
          ...this.state.currentUser,
          name,
          about,
        },
      });
      this.closeAllPopups();
    } catch (e) {
      console.error(e);
    }
  };

  handleUpdateAvatar = async (avatar) => {
    try {
      await api.createUserAvatar(avatar);
      this.setState({
        currentUser: {
          ...this.state.currentUser,
          avatar,
        },
      });
      this.closeAllPopups();
    } catch (e) {
      console.error(e);
    }
  };

  handleAddPlaceSubmit = async (newCardData) => {
    const { name, link } = newCardData;
    try {
      const newCard = await api.createUserCard(name, link);
      this.setState({
        cards: [newCard, ...this.state.cards],
      });
      this.closeAllPopups();
    } catch (e) {
      console.error(e);
    }
  };

  handleCardLike = async (card) => {
    const userInfo = this.state.currentUser;
    const isLiked = card.likes.some((i) => i._id === userInfo._id);
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);

      const cards = this.state.cards.map((c) => {
        return c._id === card._id ? newCard : c;
      });

      this.setState({ cards });
    } catch (e) {
      console.error();
    }
  };

  handleCardDelete = async (card) => {
    const userInfo = this.state.currentUser;
    const isOwn = card.owner._id === userInfo._id;
    if (isOwn) {
      try {
        await api.deleteUserCard(card._id);

        const cards = this.state.cards.filter((c) => {
          return c._id !== card._id;
        });

        this.setState({ cards, cardToDelete: null });
      } catch (e) {
        console.error();
      }
    }
  };

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: false,
      cardToDelete: null,
    });
  };

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header />
        <Main
          onEditProfile={this.handleEditProfileClick}
          onAddPlace={this.handleAddPlaceClick}
          onEditAvatar={this.handleEditAvatarClick}
          onCardClick={this.handleCardClick}
          cards={this.state.cards}
          onCardLike={this.handleCardLike}
          onCardDelete={this.handleCardDeleteClick}
        />
        {/* Popups */}
        <EditProfilePopup
          isOpen={this.state.isEditProfilePopupOpen}
          onClose={this.closeAllPopups}
          onUpdateUser={this.handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={this.state.isEditAvatarPopupOpen}
          onClose={this.closeAllPopups}
          onUpdateAvatar={this.handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={this.state.isAddPlacePopupOpen}
          onClose={this.closeAllPopups}
          onAddPlace={this.handleAddPlaceSubmit}
        />
        <DeletePlacePopup
          card={this.state.cardToDelete}
          onClose={this.closeAllPopups}
          onDeletePlace={this.handleCardDelete}
        />
        <ImagePopup
          selectedCard={this.state.selectedCard}
          cardInfo={this.state.cardInfo}
          onClose={this.closeAllPopups}
        />
        <Footer />
      </CurrentUserContext.Provider>
    );
  }
}

export default App;
