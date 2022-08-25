import React from "react";
import popupCloseButton from "../images/popup__close-icon.svg";

class ImagePopup extends React.Component {
  render() {
    const { selectedCard, cardInfo, onClose } = this.props;
    const popupOpenClass = selectedCard
      ? `popup popup_opened popup_large-img`
      : `popup popup_large-img`;
    const cardLink = selectedCard ? cardInfo.link : "data";
    const cardName = selectedCard ? cardInfo.name : "empty";
    return (
      <div className={popupOpenClass}>
        <div className="popup__large-img-content">
          <button
            className="popup__close popup__close-button popup__close-button_large-image"
            type="button"
            onClick={onClose}
          >
            <img
              className="popup__close popup__close-icon popup__close-icon_large-image"
              src={popupCloseButton}
              alt="Кнопка
      закрыть"
            />
          </button>
          <img
            className="popup__large-img-image"
            src={cardLink}
            alt={cardName}
          />
          <p className="popup__large-img-signature">{cardName}</p>
        </div>
      </div>
    );
  }
}

export default ImagePopup;
