import React from "react";
import popupCloseButton from "../images/popup__close-icon.svg";

class PopupWithForm extends React.Component {
  render() {
    const { title, name, children, buttonText, isOpen, onClose } = this.props;
    let popupOpenClass = isOpen
      ? `popup popup_opened popup_${name}`
      : `popup popup_${name}`;

    return (
      <div className={popupOpenClass}>
        <button
          className={`popup__close popup__close-button popup_${name}`}
          type="button"
          onClick={onClose}
        >
          <img
            className="popup__close popup__close-icon"
            src={popupCloseButton}
            alt="Кнопка закрыть"
          />
        </button>
        <div className="popup__content">
          <h2 className="popup__title">{`${title}`}</h2>
          <form
            className={`form form_${name}`}
            name={`${name}`}
            action="#"
            method="post"
            autoComplete="off"
            noValidate
          >
            <fieldset className="form__fieldset">
              {children}
              <button
                className={`form__save-button form__save-button_${name}`}
                type="submit"
              >
                {`${buttonText}`}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default PopupWithForm;
