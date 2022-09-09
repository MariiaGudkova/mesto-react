import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { isOpen, onClose, onUpdateUser } = props;
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAboutChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name="personal-data"
      title="Редактировать&nbsp;профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
        value={name}
        onChange={handleNameChange}
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
        value={description}
        onChange={handleAboutChange}
      />
      <span className="form__error description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
