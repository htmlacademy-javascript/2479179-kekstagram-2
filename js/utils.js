const REMOVE_MESSAGE_TIMEOUT = 5000;

// Ошибка
const errorMessageTemplate = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

// Отобраение ошибки
function showErrorMessage() {
  // Copy шаблона
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
}
function debounce(callback, timeoutDelay = 500) {
  // таймер
  let timeoutId;
  return function (...rest) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

// Рандомное целое число
function getRandomInteger(min, max) {
  // Округление
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  // ГРандомное число в диапазоне
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];// чтобы без повтора

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;// Если повторы пошли, то null
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

// Esc (true, если нажата)
function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

export { showErrorMessage, isEscapeKey, debounce, createRandomIdFromRangeGenerator };
