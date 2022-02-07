import React from 'react';


function AuthForm(props) {


  return (
    <>
      <h2 className='auth__title'>Вход</h2>
      <form
        className={`auth__form auth__form_type_${props.isForm}`}
        name={`form-${props.isForm}`}
        onSubmit={props.onSubmit}
      >
        <input
          className='auth__input'
          name='emailUser'
          type='email'
          placeholder='Email'
          required
          onChange={props.onEmail}
          value={props.isEmail}
        />
        <input
          className='auth__input'
          name='passwordUser'
          type='password'
          placeholder='Пароль'
          required
          onChange={props.onPassword}
          value={props.isPassword}
        />
        <button className='auth__submit-button' type='submit'>{props.textButton}</button>
      </form>
    </>
  )
}

export default AuthForm;