import React from 'react';

function InfoTooltip(props) {

  return (
    <div className={`popup ${props.isOpen ? 'popup_active' : ''} popup_type_info-tooltip`}
         onMouseDown={props.onPopupClick}
    >
      <div className='popup__container'>
        <div
          className={`popup__image popup__image_type_${props.status ? 'success' : 'error'}`}
        ></div>
        <p className='popup__status-text'>
          {props.status
            ?
            'Вы успешно зарегистрировались!'
            :
            'Что-то пошло не так! Попробуйте ещё раз.'
          }
        </p>
        <button
          className='popup__close'
          type='button'
          onClick={props.onClose}
        />
      </div>


    </div>
  )

}

export default InfoTooltip;