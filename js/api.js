const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const serverRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const httpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const errorText = {
  [httpMethod.GET]: 'Failed to load data',
  [httpMethod.POST]: 'Failed to send data',
};

async function request(url, method = httpMethod.GET, body = null) {
  const response = await fetch(url, { method, body });
  if (!response.ok) {
    throw new Error(errorText[method]); // Ошибка запроса
  }
  return response.json(); // Преобразование данных
}

async function loadPictures() {
  return request(SERVER_URL + serverRoute.GET_DATA); // Получить данные
}

async function sendPictures(pictureData) {
  return request(SERVER_URL + serverRoute.SEND_DATA, httpMethod.POST, pictureData); // Отправить данные
}

export { loadPictures, sendPictures };
