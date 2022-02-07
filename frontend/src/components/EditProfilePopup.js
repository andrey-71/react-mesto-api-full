import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  // Подписка на контекст данных пользователя
  const currentUser = React.useContext(CurrentUserContext);

  // Стейт-переменные:
  // - инпут с именем пользователя
  const [name, setName] = React.useState('');
  // - инпут с информацией о пользователе
  const [description, setDescription] = React.useState('');

  // Запись и очистка данных пользователя в инпуты при открытии и закрытии попапа соответственно
  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    } else {
      setName('');
      setDescription('');
    }
  }, [props.isOpen, currentUser]);

  // Обработчики изменения инпутов
  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  // Обработчик формы
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      textButton='Сохранить'
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onSubmit={handleSubmit}
      onPopupClick={props.onPopupClick}
      onClose={props.onClose}
    >
      <label className='popup__input-element'>
        <input
          type='text'
          placeholder='Ваше имя'
          className='popup__input popup__input_type_profile-name'
          id='input-profile-name'
          name='nameUser'
          value={name}
          onChange={handleChangeName}
          required
          minLength={2}
          maxLength={40}
        />
        <span className='popup__input-error' id='input-profile-name-error'/>
      </label>
      <label className='popup__input-element'>
        <input
          type='text'
          placeholder='Чем занимаетесь'
          className='popup__input popup__input_type_profile-job'
          id='input-profile-job'
          name='infoUser'
          value={description}
          onChange={handleChangeDescription}
          required
          minLength={2}
          maxLength={200}
        />
        <span className='popup__input-error' id='input-profile-job-error'/>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;