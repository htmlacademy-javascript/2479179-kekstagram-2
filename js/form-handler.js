import Pristine from '../vendor/pristine/pristine.min.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

//Показывание формы
uploadInput.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open'); // Прокрутка офф
});

// Скрытие формы
function closeForm() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open'); // Прокрутка он
  form.reset(); // Сброс полей
}

// Закрытие по кнопке
closeButton.addEventListener('click', () => {
  closeForm();
});

// Закрытие по ескейпу
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !document.activeElement.matches('input, textarea')) {
    closeForm();
  }
});

// Валидация формы
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper', // Ошибки
  errorTextParent: 'img-upload__field-wrapper', // Поле для ошибки
  errorTextClass: 'pristine-error', // Класс ошибки
});

// Валидаия хэштэгов
function validateHashtags(value) {
  if (value.trim() === '') {
    return true; // Если ничего не ввели, всё ок
  }

  const hashtags = value.toLowerCase().split(/\s+/); // Строка по пробелам
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/; // Шаблон#

  if (hashtags.length > 5) {
    return false; // error много хэштегов
  }

  const uniqueHashtags = new Set(hashtags); // Убираем повторы
  if (uniqueHashtags.size !== hashtags.length) {
    return false; // error повтор #
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (!hashtagRegex.test(hashtags[i])) {
      return false; // error формат #
    }
  }
  return true;
}

// Валидация комментария
function validateComment(value) {
  if (value.length > 140) {
    return false; // error длинный текст
  }
  return true;
}

// Pristine
pristine.addValidator(hashtagInput, validateHashtags, 'Неверный формат хэштегов');
pristine.addValidator(commentInput, validateComment, 'Комментарий не должен превышать 140 символов');

// Проверка при отправке
form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (pristine.validate()) {
    form.submit();
  }
});
