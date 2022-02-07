import React from 'react';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import auth from '../utils/auth';
import api from '../utils/api';



function App() {
  const navigate = useNavigate();
  // Стейт-переменные:
  // - данных пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  // - карточек
  const [cards, setCards] = React.useState([]);
  // - попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  // - процесса загрузки данных на сервер
  const [isLoading, setIsLoading] = React.useState(false);
  // - регистрации
  const [isRegistered, setIsRegistered] = React.useState(false);
  // - авторизации
  const [isLogged, setIsLogged] = React.useState(false);
  // - почты пользователя
  const [isEmailUser, setIsEmailUser] = React.useState('');


  // Авторизация пользователя
  function handleLogin(userData) {
    auth.authorize(userData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setIsLogged(true);
          setIsEmailUser(userData.email);
          navigate('/');
        }
      })
      .catch(err => console.log(`При авторизации произошла ошибка: ${err}`));
  }

  // Регистрация пользователя
  function handleRegister(userData) {
    auth.register(userData)
      .then(() => {
        setIsRegistered(true);
        setIsInfoTooltipPopupOpen(true);
        setTimeout(() => {
          navigate('/sign-in');
        }, 2000)
      })
      .catch((err) => {
        setIsRegistered(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(`При регистрации произошла ошибка: ${err}`);
      })
  }


  // Проверка наличия сохраненных данных пользователя и автоматическая авторизация
  React.useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      auth.checkToken(userToken)
        .then((res) => {
          if (res) {
            setIsLogged(true);
            setIsEmailUser(res.data.email);
          }
        })
        .catch(err => console.log(`Токен не найден: ${err}`))
    }
  }, [])

  // Выход из учетной записи
  function onSignOut() {
    localStorage.removeItem('token');
    setIsLogged(false);
  }


  // Получение карточек и данных пользователя, отрисовка на странице
  React.useEffect(() => {
    api.getAppInfo()
      .then(([getUserInfo, getInitialCards]) => {
        setCurrentUser(getUserInfo);
        setCards(getInitialCards);
      })
      .catch(err => console.log(`При загрузке данных с сервера произошла ошибка: ${err}`));
  }, [])


  // Открытие попапов
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleCardDeleteClick = (card) => {
    setIsDeleteCardPopupOpen(card);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  // Закрытие попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }
  // Закрытие попапа при нажатии Esc
  React.useEffect(() => {
    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isDeleteCardPopupOpen || isInfoTooltipPopupOpen || selectedCard) {
      const handleEscClick = (evt) => {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }
      document.addEventListener('keyup', handleEscClick);

      return () => {
        document.removeEventListener('keyup', handleEscClick);
      }
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, isDeleteCardPopupOpen, isInfoTooltipPopupOpen, selectedCard]);
  // Закрытие попапа при клике на overlay
  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }


  // Отправка на сервер
  // - данных пользователя
  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`При отправке данных пользователя произошла ошибка: ${err}`))
      .finally(() => setIsLoading(false))
  }

  // - аватара пользователя
  function handleUpdateAvatar(userData) {
    setIsLoading(true);
    api.setUserAvatar(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`При изменении аватара произошла ошибка: ${err}`))
      .finally(() => setIsLoading(false))
  }

  // - данных новой карточки
  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api.setNewCard(newCard)
      .then((res) => {
        if (cards) {
          setCards([res, ...cards]);
          closeAllPopups();
        }
      })
      .catch(err => console.log(`При отправке данных новой карточки произошла ошибка: ${err}`))
      .finally(() => setIsLoading(false))
  }

  // - запроса на удаление карточки
  function handleDeleteCardSubmit(card) {
    setIsLoading(true);
    api.deleteCard(card)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.log(`При удалении карточки произошла ошибка: ${err}`))
      .finally(() => setIsLoading(false))
  }


  // Лайк на карточке
  function handleCardLike(card) {
    const isLiked = card.likes.some(c => c._id === currentUser._id);

    api.setLikeCard(card, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((item) => item._id === card._id ? newCard : item));
      })
      .catch(err => console.log(`При постановке/снятии лайк произошла ошибка: ${err}`));
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='container'>

        <Routes>
          {/* Страница авторизации */}
          <Route path='/sign-in' element={
            isLogged ?
              <Navigate to='/'/>
              :
              <>
                <Header link={'/sign-up'} textAuth={'Регистрация'}/>
                <Login onLogin={handleLogin}/>
              </>
          }/>
          {/* Страница регистрации */}
          <Route path='/sign-up' element={
            isLogged ?
              <Navigate to='/'/>
              :
              <>
                <Header link={'/sign-in'} textAuth={'Войти'}/>
                <Register
                  onRegister={handleRegister}
                  isRegistered={isRegistered}
                  isOpen={isInfoTooltipPopupOpen}
                  onClose={closeAllPopups}
                  onPopupClick={handleOverlayClick}
                />
                <InfoTooltip
                  status={isRegistered}
                  isOpen={isInfoTooltipPopupOpen}
                  onClose={closeAllPopups}
                  onPopupClick={handleOverlayClick}
                />
              </>
          }/>

          {/* Главная страница */}
          <Route path='/' element={
            <>
              <Header
                link={'sign-in'}
                emailUser={isEmailUser}
                textAuth={'Выйти'}
                onSignOut={onSignOut}
                isLogged={isLogged}
              />
              <ProtectedRoute isLogin={isLogged}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteClick}
                  cards={cards}
                />

                {/* Popup edit user info */}
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  isLoading={isLoading}
                  onUpdateUser={handleUpdateUser}
                  onPopupClick={handleOverlayClick}
                  onClose={closeAllPopups}
                />

                {/* Popup edit user avatar */}
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  isLoading={isLoading}
                  onUpdateAvatar={handleUpdateAvatar}
                  onPopupClick={handleOverlayClick}
                  onClose={closeAllPopups}
                />

                {/* Popup add cards */}
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  isLoading={isLoading}
                  onAddPlace={handleAddPlaceSubmit}
                  onPopupClick={handleOverlayClick}
                  onClose={closeAllPopups}
                />

                {/* Popup delete card */}
                <DeleteCardPopup
                  isOpen={isDeleteCardPopupOpen}
                  isLoading={isLoading}
                  onDeleteCard={handleDeleteCardSubmit}
                  onPopupClick={handleOverlayClick}
                  onClose={closeAllPopups}
                />

                {/* Popup view card */}
                <ImagePopup
                  card={selectedCard}
                  onPopupClick={handleOverlayClick}
                  onClose={closeAllPopups}
                />
              </ProtectedRoute>
            </>
          }/>
        </Routes>

        <Footer/>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
