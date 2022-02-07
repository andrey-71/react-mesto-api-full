import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  // Реф ссылки на картинку
  const avatarLink = React.useRef('');

  // Обработчик формы
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarLink.current.value
    });
  }

  // Очистка поля ввода при закрытии попапа
  React.useEffect(() => {
    if (!props.isOpen) {
      avatarLink.current.value = '';
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      textButton='Сохранить'
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onSubmit={handleSubmit}
      onPopupClick={props.onPopupClick}
      onClose={props.onClose}
    >
      <label className='popup__input-element'>
        <input
          type='url'
          placeholder='Ссылка на картинку'
          className='popup__input popup__input_type_avatar-link'
          id='input-avatar-link'
          name='avatarUser'
          ref={avatarLink}
          required
        />
        <span className='popup__input-error' id='input-avatar-link-error'/>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;