// @todo: Настройки запроса
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: 'ff161c49-24fc-438f-b635-5dff7fb5cccd',
    'Content-Type': 'application/json'
  }
}

// @todo: Функция запроса
const doRequest = (url, options) => {
  return fetch(url, options)
    .then(respons => {
      if (respons.ok)
        return respons.json();

      return Promise.reject(`Ошибка: ${respons.status}`);
    });
}

// @todo: Функция запроса на получение информации о пользователе
const doRequestGetUserInfo = () => {
  return doRequest(`${config.baseUrl}/users/me`, {
    headers: config.headers
  });
}

// @todo: Функция запроса на получение карточек
const doRequestGetInitialCards = () => {
  return doRequest(`${config.baseUrl}/cards`, {
    headers: config.headers
  });
}

// @todo: Функция запроса на отправку информации о пользователе
const doRequestPatchUserInfo = (name, about) => {
  return doRequest(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  });
}

// @todo: Функция запроса на отправку отправки информации об аватарке
const doRequestPatchAvatarInfo = (avatar) => {
  return doRequest(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  });
}

// @todo: Функция запроса на отправку информации о созданной карточке
const doRequestPostNewCard = (name, link) => {
  return doRequest(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  });
}

// @todo: Функция запроса на отправку информации о лайке
const doRequestPutCardLike = (cardId) => {
  return doRequest(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  });
}

// @todo: Функция запроса на удаление информации о лайке
const doRequestDeleteCardLike = (cardId) => {
  return doRequest(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

// @todo: Функция запроса на удаление карточки
const doRequestDeleteCard = (cardId) => {
  return doRequest(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}


export {
  doRequestGetInitialCards,
  doRequestGetUserInfo,
  doRequestPatchAvatarInfo,
  doRequestPatchUserInfo,
  doRequestPostNewCard,
  doRequestPutCardLike,
  doRequestDeleteCardLike,
  doRequestDeleteCard
}
