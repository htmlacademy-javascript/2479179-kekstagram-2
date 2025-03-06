/* eslint-disable no-console */
import { generatePhotos } from './photos';

// Генерация массива фотографий
const generatedPhotos = generatePhotos();
console.log(generatedPhotos);

// Отрисовываем миниатюры
import { renderThumbnails } from './thumbnails.js';
import './big-picture.js'; // Подключаем, чтобы функции работали

renderThumbnails(); // Запускаем генерацию миниатюр

//Форма загрузки изображения
import './form-handler.js';

//Сервер
import { fetchData, sendFormData } from './api.js';

const form = document.querySelector('.img-upload__form');

// Загрузка с сервера
fetchData().then((data) => {
  console.log('Полученные данные:', data);
});

// Обработчик формы
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const response = await sendFormData(form);

  if (response) {
    console.log('Форма успешно отправлена:', response);
    form.reset();
  } else {
    console.error('Ошибка при отправке формы');
  }
});
