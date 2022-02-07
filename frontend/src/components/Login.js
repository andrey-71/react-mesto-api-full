import React from 'react';
import AuthForm from './AuthForm';

function Login(props) {
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
    props.onLogin({email, password});
  }


  return (
    <div className='auth auth_type_login container__auth'>
      <AuthForm
        isForm={'login'}
        isEmail={email}
        isPassword={password}
        onEmail={handleChangeEmail}
        onPassword={handleChangePassword}
        onSubmit={handleSubmit}
        textButton={'Войти'}
      />

      <div className='auth__sign-up'></div>
    </div>
  )
}

export default Login;