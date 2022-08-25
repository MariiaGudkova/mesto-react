import React from "react";
import avatarEditButton from "../images/profile__avatar_after.png";
import profileEditButton from "../images/profile__edit-button.svg";
import profileAddButton from "../images/profile__add-button.svg";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import Card from "./Card.jsx";
import api from "../utils/api.js";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      userDescription: "",
      userAvatar: "",
      cards: [],
    };
  }

  getApiUserInfo = async () => {
    const userInfo = await api.getUserInfo();
    const cardsInfo = await api.getInitialCards();
    const { name, about, avatar } = userInfo;
    this.setState({
      userName: name,
      userDescription: about,
      userAvatar: avatar,
      cards: cardsInfo,
    });
  };

  componentDidMount = () => {
    this.getApiUserInfo();
  };

  render() {
    const {
      onEditProfile,
      onAddPlace,
      onEditAvatar,
      onCardClick,
      isEditProfilePopupOpen,
      isAddPlacePopupOpen,
      isEditAvatarPopupOpen,
      selectedCard,
      cardInfo,
      closeAllPopups,
    } = this.props;
    return (
      <>
        <main className="container">
          <section className="profile">
            <div className="profile__avatar-container">
              <img
                className="profile__avatar"
                src={this.state.userAvatar}
                alt="Жак-Ив Кусто"
              />
              <button
                className="profile__avatar-change-button"
                type="button"
                onClick={onEditAvatar}
              >
                <img
                  className="profile__avatar-change-button-image"
                  src={avatarEditButton}
                  alt="Кнопка
                редактирования фото"
                />
              </button>
            </div>
            <div className="profile__info">
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              >
                <img
                  className="profile__edit-button-image"
                  src={profileEditButton}
                  alt="Кнопка
              редактирования"
                />
              </button>
              <h1 className="profile__title">{this.state.userName}</h1>
              <p className="profile__subtitle">{this.state.userDescription}</p>
            </div>
            <button
              className="profile__add-button"
              type="button"
              onClick={onAddPlace}
            >
              <img
                className="profile__add-button-image"
                src={profileAddButton}
                alt="Кнопка
            добавления"
              />
            </button>
          </section>
          <section className="elements">
            <ul className="element">
              {this.state.cards.map((card) => {
                return (
                  <Card card={card} key={card._id} onCardClick={onCardClick} />
                );
              })}
            </ul>
          </section>
        </main>
        {/* Popups */}
        <PopupWithForm
          name="personal-data"
          title="Редактировать&nbsp;профиль"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
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
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
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
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
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
          onClose={closeAllPopups}
        ></PopupWithForm>
        <ImagePopup
          selectedCard={selectedCard}
          cardInfo={cardInfo}
          onClose={closeAllPopups}
        />
      </>
    );
  }
}

export default Main;
