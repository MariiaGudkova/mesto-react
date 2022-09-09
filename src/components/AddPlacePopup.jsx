import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  let card = {
    name: name,
    link: link,
  };

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      await onAddPlace(card);
      setName("");
      setLink("");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
        value={name}
        onChange={handleNameChange}
      />
      <span className="form__error name-card-input-error"></span>
      <input
        className="form__input form__input_text_image"
        id="image-url-input"
        type="url"
        name="url"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="form__error image-url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
