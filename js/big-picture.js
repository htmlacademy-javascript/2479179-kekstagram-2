// Находим элементы
const bigPicture = document.querySelector('.big-picture'); // Окно полноэкранного просмотра
const bigPictureImg = bigPicture.querySelector('.big-picture__img img'); // Само изображение
const likesCount = bigPicture.querySelector('.likes-count'); // Количество лайков
const caption = bigPicture.querySelector('.social__caption'); // Описание
const commentsContainer = bigPicture.querySelector('.social__comments'); // Контейнер для комментариев
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count'); // Кол-во показанных комментариев
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count'); // Всего комментариев
const closeButton = bigPicture.querySelector('.big-picture__cancel'); // Кнопка закрытия

// Скрываем блоки
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

commentCountBlock.classList.add('hidden'); // Скрываем счетчик комментариев
commentsLoader.classList.add('hidden'); // Скрываем кнопку загрузки комментариев

// Создание элемента комментария
function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
        <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
        <p class="social__text">${comment.message}</p>
    `;

  return commentElement;
}

// Отображение фотографии в полноэкранном режиме
function openBigPicture(photo) {
  bigPicture.classList.remove('hidden'); // Показываем окно
  document.body.classList.add('modal-open'); // Запрещаем прокрутку фона

  bigPictureImg.src = photo.url; // Устанавливаем изображение
  bigPictureImg.alt = photo.description; // Устанавливаем описание
  likesCount.textContent = photo.likes; // Показываем количество лайков
  caption.textContent = photo.description; // Показываем описание

  // Очищаем список комментариев
  commentsContainer.innerHTML = '';

  // Добавляем комментарии в блок
  photo.comments.forEach((comment) => {
    commentsContainer.appendChild(createCommentElement(comment));
  });

  // Обновляем счетчик комментариев
  commentShownCount.textContent = photo.comments.length;
  commentTotalCount.textContent = photo.comments.length;
}

// Закрытие полноэкранного просмотра
function closeBigPicture() {
  bigPicture.classList.add('hidden'); // Скрываем окно
  document.body.classList.remove('modal-open'); // Включаем прокрутку
}

// Обработчик нажатия на кнопку закрытия
closeButton.addEventListener('click', closeBigPicture);

// Закрытие окна по нажатию `Esc`
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeBigPicture();
  }
});

export { openBigPicture };
