import React from 'react';
import {Link} from 'react-router-dom';
import AuthForm from './AuthForm';


function Register(props) {

  // Стейты инпутов
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Обработчики изменения состояния инпутов
  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  // Обработчик формы
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister({email, password});
  }


  return (
    <div className='auth auth_type_registr container__auth'>
      <AuthForm
        isForm={'registr'}
        isEmail={email}
        isPassword={password}
        onEmail={handleChangeEmail}
        onPassword={handleChangePassword}
        onSubmit={handleSubmit}
        textButton={'Зарегистрироваться'}
      />
      <div className='auth__sign-in'>
        <p className='auth__registration-request-text'>Уже зарегистрированы?</p>
        <Link to='/sign-in' className='auth__login-link'>Войти</Link>
      </div>
    </div>
  )
}

export default Register;