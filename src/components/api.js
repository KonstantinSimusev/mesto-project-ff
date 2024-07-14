// @todo: Переменные
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: 'ff161c49-24fc-438f-b635-5dff7fb5cccd',
    'Content-Type': 'application/json',
  }
}

// @todo: Функция получения карточек
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(respons => {
      if (respons.ok)
        return respons.json();

      return Promise.reject(`Ошибка: ${respons.status}`);
    })
}

// @todo: Функция получения информации пользователя
function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(respons => {
      if (respons.ok)
        return respons.json();

      return Promise.reject(`Ошибка: ${respons.status}`);
    })
}

// @todo: Функция отправки информации о пользователе
function patchUserInfo(name, description) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    })
  })
    .then(respons => {
      if (respons.ok)
        return respons.json();

      return Promise.reject(`Ошибка: ${respons.status}`);
    })
}

// @todo: Функция отправки информации об аватарке
function patchAvatarInfo(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    })
  })
    .then(respons => {
      if (respons.ok)
        return respons.json();

      return Promise.reject(`Ошибка: ${respons.status}`);
    })
}

// @todo: Функция отправки информации о созданной карточке
function postNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
    .then(respons => {
      if (respons.ok)
        return respons.json();

      return Promise.reject(`Ошибка: ${respons.status}`);
    })
}

// @todo: Функция отправки информации о лайке
function putCardLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId._id}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(respons => {
      if (respons.ok)
        return respons.json();

      return Promise.reject(`Ошибка: ${respons.status}`);
    })
}

// @todo: Функция удаления информации о лайке
function deleteCardLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId._id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(respons => {
      if (respons.ok)
        return respons.json();

      return Promise.reject(`Ошибка: ${respons.status}`);
    })
}

// @todo: Функция удаления карточки
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId._id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(respons => {
      if (respons.ok)
        return respons.json();

      return Promise.reject(`Ошибка: ${respons.status}`);
    })
}

export {
  getInitialCards,
  getUserInfo,
  patchAvatarInfo,
  patchUserInfo,
  postNewCard,
  putCardLike,
  deleteCardLike,
  deleteCard,
}
