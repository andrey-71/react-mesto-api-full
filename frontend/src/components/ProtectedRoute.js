import React from 'react';
import {Navigate} from 'react-router-dom';

const ProtectedRoute = (props) => {
  /* Доступ на главную страницу только для авторизованных пользователей */
  return props.isLogin ? props.children : <Navigate to='/sign-in'/>}

export default ProtectedRoute;