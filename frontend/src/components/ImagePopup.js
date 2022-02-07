import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup ${props.card ? 'popup_active' : ''} popup_type_card-view`} onClick={props.onPopupClick}>
      <div className='popup__card-view-container'>
        <img src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''}
             className='popup__card-view-photo'/>
        <p className='popup__card-view-caption'>{props.card ? props.card.name : ''}</p>
        <button
          className='popup__close'
          type='button'
          onClick={props.onClose}
        />
      </div>
    </div>
  )
}

export default ImagePopup;