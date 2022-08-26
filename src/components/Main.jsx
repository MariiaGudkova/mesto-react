import React from "react";
import avatarEditButton from "../images/profile__avatar_after.png";
import profileEditButton from "../images/profile__edit-button.svg";
import profileAddButton from "../images/profile__add-button.svg";
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
    try {
      const userInfo = await api.getUserInfo();
      const cardsInfo = await api.getInitialCards();
      const { name, about, avatar } = userInfo;
      this.setState({
        userName: name,
        userDescription: about,
        userAvatar: avatar,
        cards: cardsInfo,
      });
    } catch (e) {
      console.error(e);
    }
  };

  componentDidMount = () => {
    this.getApiUserInfo();
  };

  render() {
    const { onEditProfile, onAddPlace, onEditAvatar, onCardClick } = this.props;
    return (
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
    );
  }
}

export default Main;
