import { generatePhotos } from './photos.js';
import { openBigPicture } from './big-picture.js';

// Функция для отрисовки миниатюр
export function renderThumbnails() {
  // Генерируем данные о фотографиях
  const photos = generatePhotos();

  // Находим контейнер, куда будем добавлять миниатюры
  const picturesContainer = document.querySelector('.pictures');

  // Находим шаблон миниатюры
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // Создаём DocumentFragment для вставки элементов
  const fragment = document.createDocumentFragment();

  // Обходим каждую фотографию из сгенерированных данных
  photos.forEach((photo) => {
    // Клонируем шаблон элемента
    const pictureElement = pictureTemplate.cloneNode(true);

    // Заполняем шаблон данными фотографии
    const pictureImg = pictureElement.querySelector('.picture__img'); // Изображение
    const pictureLikes = pictureElement.querySelector('.picture__likes'); // Лайки
    const pictureComments = pictureElement.querySelector('.picture__comments'); // Комментарии

    pictureImg.src = photo.url; // Устанавливаем путь к изображению
    pictureImg.alt = photo.description; // Описание для alt
    pictureLikes.textContent = photo.likes; // Количество лайков
    pictureComments.textContent = photo.comments.length; // Количество комментариев

    // Добавляем обработчик клика на миниатюру
    pictureElement.addEventListener('click', () => {
      openBigPicture(photo); // Открываем полноразмерное изображение с нужными данными
    });

    // Добавляем миниатюру в DocumentFragment
    fragment.appendChild(pictureElement);
  });

  // Вставляем все миниатюры в контейнер .pictures
  picturesContainer.appendChild(fragment);
}
