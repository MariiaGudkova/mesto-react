import React from "react";
import popupTrashButton from "../images/element__trash-button-image.svg";

class Card extends React.Component {
  handleClick = () => {
    this.props.onCardClick(this.props.card);
  };

  render() {
    const { card } = this.props;
    return (
      <li className="element__item">
        <img
          className="element__image"
          src={card.link}
          alt={card.name}
          onClick={this.handleClick}
        />
        <div className="element__signature">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like">
            <button className="element__like-button" type="button"></button>
            <p className="element__like-count">{card.likes.length}</p>
          </div>
        </div>
        <button className="element__trash-button" type="button">
          <img
            className="element__trash-button-image"
            src={popupTrashButton}
            alt="Иконка мусорки"
          />
        </button>
      </li>
    );
  }
}

export default Card;
