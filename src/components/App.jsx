import React from "react";
import "../index.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import Footer from "./Footer.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: false,
      cardInfo: null,
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
        />
        {/* Popups */}
        <PopupWithForm
          name="personal-data"
          title="Редактировать&nbsp;профиль"
          buttonText="Сохранить"
          isOpen={this.state.isEditProfilePopupOpen}
          onClose={this.closeAllPopups}
        >
          <input
            className="form__input form__input_text_name"
            id="name-input"
            type="text"
            name="name"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="form__error name-input-error"></span>
          <input
            className="form__input form__input_text_description"
            id="description-input"
            type="text"
            name="about"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="form__error description-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="change-avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={this.state.isEditAvatarPopupOpen}
          onClose={this.closeAllPopups}
        >
          <input
            className="form__input form__input_avatar_image"
            id="image-link-input"
            type="url"
            name="avatar"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="form__error image-link-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="add-card"
          title="Новое место"
          buttonText="Создать"
          isOpen={this.state.isAddPlacePopupOpen}
          onClose={this.closeAllPopups}
        >
          <input
            className="form__input form__input_text_name form__input_text_name-card"
            id="name-card-input"
            type="text"
            name="name"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="form__error name-card-input-error"></span>
          <input
            className="form__input form__input_text_image"
            id="image-url-input"
            type="url"
            name="url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="form__error image-url-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonText="Да"
          onClose={this.closeAllPopups}
        ></PopupWithForm>
        <ImagePopup
          selectedCard={this.state.selectedCard}
          cardInfo={this.state.cardInfo}
          onClose={this.closeAllPopups}
        />
        <Footer />
      </>
    );
  }
}

export default App;
