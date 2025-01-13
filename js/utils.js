// Функция для получения случайного числа в заданном диапазоне
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
