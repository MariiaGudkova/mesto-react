import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";

function DeletePlacePopup(props) {
  const { card, onClose, onDeletePlace } = props;

  function handleSubmit(event) {
    event.preventDefault();
    onDeletePlace(card);
  }
  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={Boolean(card)}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default DeletePlacePopup;
