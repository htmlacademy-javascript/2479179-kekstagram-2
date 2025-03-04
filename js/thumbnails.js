/* eslint-disable no-alert */
/* eslint-disable no-console */
import { fetchData } from './api.js';
import { openBigPicture } from './big-picture.js';

// Функция для отрисовки миниатюр с сервера
export async function renderThumbnails() {
  try {
    const photos = await fetchData(); // Загружаем данные с сервера
    if (!photos.length) {
      throw new Error('Список фотографий пуст');
    }

    const picturesContainer = document.querySelector('.pictures');
    const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    const fragment = document.createDocumentFragment();

    photos.forEach((photo) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      const pictureImg = pictureElement.querySelector('.picture__img');
      const pictureLikes = pictureElement.querySelector('.picture__likes');
      const pictureComments = pictureElement.querySelector('.picture__comments');

      pictureImg.src = photo.url;
      pictureImg.alt = photo.description;
      pictureLikes.textContent = photo.likes;
      pictureComments.textContent = photo.comments.length;

      pictureElement.addEventListener('click', () => {
        openBigPicture(photo);
      });

      fragment.appendChild(pictureElement);
    });

    picturesContainer.appendChild(fragment);
  } catch (error) {
    console.error('Ошибка загрузки фотографий:', error);
    alert('Ошибка загрузки данных. Попробуйте позже.');
  }
}
