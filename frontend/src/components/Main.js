import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Card from './Card';


function Main(props) {
  // Подписка на контекст данных пользователя
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className='content container__content'>
      {/* Profile */}
      <section className='profile'>
        <div className='profile__user-data'>
          <button className='profile__edit-avatar' type='button' onClick={props.onEditAvatar}>
            <img
              src={currentUser.avatar}
              alt='Фотография пользователя'
              className='profile__avatar'
            />
          </button>
          <div className='profile__info'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <p className='profile__job'>{currentUser.about}</p>
            <button
              className='profile__edit-button'
              type='button'
              onClick={props.onEditProfile}
            />
          </div>
        </div>
        <button
          className='profile__add-button'
          type='button'
          onClick={props.onAddPlace}
        />
      </section>
      {/* Photo gallery */}
      <section className='card-gallery content__card-gallery'>
        {props.cards.map((card) => (
          <Card
            card={card}
            name={card.name}
            link={card.link}
            likes={card.likes.length}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            key={card._id}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;