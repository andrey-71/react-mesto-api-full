import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
  // Подписка на контекст данных пользователя
  const currentUser = React.useContext(CurrentUserContext);

  // Отрисовка кнопки удаления карточки, если карточка создана пользователем
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  );
  // Отрисовка лайка на карточке, поставленного пользователем
  const isLiked = props.card.likes.some(like => like === currentUser._id);
  const cardLikeButtonClassName = `card__like${isLiked ? ' card__like_active' : ''}`;

  return (
    <figure className='card'>
      <img
        src={props.link}
        alt={props.name}
        className='card__image'
        onClick={
          function handleClick() {
            props.onCardClick(props.card)
          }
        }
      />
      <button
        className={cardDeleteButtonClassName}
        type='button'
        onClick={
          function handleDelete() {
            props.onCardDelete(props.card);
          }
        }
      />
      <figcaption className='card__info'>
        <h2 className='card__caption'>{props.name}</h2>
        <div className='card__like-section'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            onClick={
              function handleLikeClick() {
                props.onCardLike(props.card)
              }
            }
          />
          <p className='card__like-number'>{props.likes}</p>
        </div>
      </figcaption>
    </figure>
  )
}

export default Card