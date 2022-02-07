import {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  // Стейт-переменные:
  // - инпут с подписью карточки
  const [name, setName] = useState('');
  // - инпут с ссылкой карточки
  const [link, setLink] = useState('');

  // Обработчики изменения инпутов
  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  // Обработчик формы
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({name, link});
  }

  // Очистка полей ввода при закрытии попапа
  useEffect(() => {
    if (!props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props.isOpen]);


  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      textButton='Создать'
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onSubmit={handleSubmit}
      onPopupClick={props.onPopupClick}
      onClose={props.onClose}
    >
      <label className='popup__input-element'>
        <input
          type='text'
          placeholder='Название'
          className='popup__input popup__input_type_card-name'
          id='input-card-name'
          name='name'
          value={name}
          onChange={handleChangeName}
          required
          minLength={2}
          maxLength={30}
        />
        <span className='popup__input-error' id='input-card-name-error'/>
      </label>
      <label className='popup__input-element'>
        <input
          type='url'
          placeholder='Ссылка на картинку'
          className='popup__input popup__input_type_card-link'
          id='input-card-link'
          name='link'
          value={link}
          onChange={handleChangeLink}
          required
        />
        <span className='popup__input-error' id='input-card-link-error'/>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;