# React-Mesto-Api-Full
Проектная работа 15 спринта 6 курса факультета ["Веб-разработчик"](https://practicum.yandex.ru/web/?utm_source=yandex&utm_medium=cpc&utm_campaign=Yan_Sch_RF_Webr_Razrab_Des_Intro_460&utm_content=sty_search:s_none:cid_56600998:gid_4359516496:pid_23387311960:aid_9838725511:crid_0:rid_:p_1:pty_premium:mty_syn:mkw_:dty_desktop:cgcid_0:rn_Москва:rid_213&utm_term=разработка%20web&yclid=4769457341696616776) образовательной платформы [Яндекс.Практикум](https://practicum.yandex.ru/).


## Описание проекта:
Сервис Mesto для обмена фотографиями. Репозиторий включает фронтенд и бэкенд части проекта
___


## Зайти на сайт можно по ссылке:
* https://mesto-frontend.andrey-g.nomoredomains.xyz*
* http://mesto-frontend.andrey-g.nomoredomains.xyz

### Адрес сервера:
* Адрес сервера: https://m.esto-backend.andrey-g.nomoredomains.xyz
* IP-адрес сервера: 84.252.128.213:3000
___


## Функционал
* Регистрация и авторизация пользователя;
* Автоматическая авторизация пользователя при перезагрузке страницы;
* Редактирование данных пользователя (имени, роде деятельности, аватара);
* Добавление новых карточек;
* Возможность постановки/снятия лайка на карточках;
* Возможность удаления карточек, созданных пользователем;
* Просмотр фотографий карточек в полноэкранном режиме;
* Адаптивный дизайн на разрешениях ширины экрана от `320px`;
* Бургер-меню на главной странице на разрешениях менее `768px`;
* Браузерная валидация на стороне клиента;
* Обработка ошибок сервером и joi-валидация.
___

## Технологии

### <ins>Frontend:<ins>
* Семантическая верстка;
* БЭМ, Nested БЭМ;
* CSS Flexbox, GridLayout, Media queries;
* Java Script ES6;
* React, JSX, маршрутизация на `react-router-dom`. localStorage для хранения id пользователя.

### <ins>Backend:<ins>
* REST API;
* Node.js;
* Express.js, роутинг, middlewares;
* RegEx;
* Централизованная обработка ошибок;
* joi-валидация;
* JWT-аутентификация, хэширование пароля, использование cookie, CORS-запросы, CSRF; 
* MongoDB;
* Логирование запросов и ошибок.
___

## Инструкция по локальному развертыванию:
* Клонировать репозиторий:
  ```
    https://github.com/andrey-71/react-mesto-api-full.git
  ```
* <ins>Backend:<ins>
  * В директории /backend установить зависимости 
    ```
    npm i
    ```
  * Запуск проекта
    ```
    npm run start
    ``` 

* <ins>Frontend:<ins>
  * В директории /frontend установить зависимости
    ```
    npm i
    ```
  * Сборка проекта
    ```
    npm run build
    ```
  * Запуск проекта
    ```
    npm run start
    ```   
___

## Планы по доработке проекта:
* Кастомная валидация на стороне клиента;
* Улучшить UX при отправке запросов, выводить ошибки в попап.


## Требования к проекту:
* [Чеклист](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-15.pdf)
