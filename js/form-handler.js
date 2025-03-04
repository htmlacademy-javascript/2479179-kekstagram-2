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
  document.body.classList.remove('modal-open'); // Включаем прокрутку
  form.reset(); // Сбрасываем поля формы
  resetScale();
  resetEffects(); // Сбрасываем фильтры
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

//Масштаб
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

let scale = 100;

// Обновление масштаба
function updateScale() {
  scaleValue.value = `${scale}%`; // Обновление поля
  previewImage.style.transform = `scale(${scale / 100})`; // Масштаб изобр
}

// Уменьшение масштаба
scaleSmaller.addEventListener('click', () => {
  if (scale > 25) {
    scale -= 25;
    updateScale();
  }
});

// Увеличение масштаба
scaleBigger.addEventListener('click', () => {
  if (scale < 100) {
    scale += 25;
    updateScale();
  }
});

// Сброс масштаба при закрытии
function resetScale() {
  scale = 100;
  updateScale();
}

//noUiSlider

const effectSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const preview = document.querySelector('.img-upload__preview img');
const effects = document.querySelectorAll('.effects__radio');

// Слайдер
noUiSlider.create(effectSlider, {
  range: { min: 0, max: 1 },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

// Список эффектов и их параметры
const EFFECTS = {
  none: { min: 0, max: 1, step: 0.1, unit: '', filter: '' },
  chrome: { min: 0, max: 1, step: 0.1, unit: '', filter: 'grayscale' },
  sepia: { min: 0, max: 1, step: 0.1, unit: '', filter: 'sepia' },
  marvin: { min: 0, max: 100, step: 1, unit: '%', filter: 'invert' },
  phobos: { min: 0, max: 3, step: 0.1, unit: 'px', filter: 'blur' },
  heat: { min: 1, max: 3, step: 0.1, unit: '', filter: 'brightness' },
};

// Функция обновления слайдера под эффект
function updateSlider(effect) {
  const settings = EFFECTS[effect];
  effectSlider.noUiSlider.updateOptions({
    range: { min: settings.min, max: settings.max },
    start: settings.max,
    step: settings.step,
  });
  effectLevel.value = settings.max; // Обновление скрытого поля
  applyEffect(effect, settings.max); // Применение эффекта
}

// Применение эффекта к изображению
function applyEffect(effect, value) {
  const settings = EFFECTS[effect];
  preview.style.filter = effect === 'none' ? 'none' : `${settings.filter}(${value}${settings.unit})`;
}

// Обновление эффекта при изменении слайдера
effectSlider.noUiSlider.on('update', (values) => {
  const effect = document.querySelector('.effects__radio:checked').value;
  effectLevel.value = values[0];
  applyEffect(effect, values[0]);
});

// Смена эффекта
effects.forEach((effect) => {
  effect.addEventListener('change', () => {
    updateSlider(effect.value);
  });
});

// Сброс эффектов при закрытии формы
function resetEffects() {
  document.querySelector('#effect-none').checked = true;
  preview.style.filter = 'none';
  updateSlider('none');
}

import { sendFormData } from './api.js';


const submitButton = form.querySelector('.img-upload__submit');


// Сообщения об успешной или неудачной отправке
function showMessage(success = true) {
  const templateId = success ? '#success' : '#error';
  const template = document.querySelector(templateId).content.cloneNode(true);
  document.body.appendChild(template);

  // Закрытие сообщения
  setTimeout(() => document.querySelector(templateId.replace('#', '.')).remove(), 3000);
}

// Обработчик отправки формы
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  submitButton.disabled = true; // Блок кнопки

  const response = await sendFormData(form);

  if (response) {
    closeForm();
    showMessage(true); // Успешное сообщение
  } else {
    showMessage(false); // Сообщение об ошибке
  }

  submitButton.disabled = false; // Анлок кнопки
});
