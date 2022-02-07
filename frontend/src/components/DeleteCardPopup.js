import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
  // Обработчик формы
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onDeleteCard(props.isOpen);
  }

  return (
    <PopupWithForm
      name='delete-card'
      title='Вы уверены?'
      textButton='Да'
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onSubmit={handleSubmit}
      onPopupClick={props.onPopupClick}
      onClose={props.onClose}
    />
  )
}

export default DeleteCardPopup;