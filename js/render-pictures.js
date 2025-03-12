import { showBigPicture } from './render-big-pictures.js';

const container = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content;
const template = picturesTemplate.querySelector('.picture');

// Функция для создания одной картинки
function createPicture({ url, description, likes, comments }) {
  const picture = template.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  return picture;
}


// Функция для отображения всех картинок
function renderPictures(pictures) {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const newPicture = createPicture(picture);
    newPicture.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(picture);
    });
    fragment.appendChild(newPicture);
  });
  container.appendChild(fragment);
}

export { renderPictures, container };
