/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const checkLength = (string = '', maxSymbols = 1) => string.length <= maxSymbols;

function comparesStringLength(string, length) {
  if (string.length <= length) {
    return true;
  }
}

//  ******************
function isPalindrome(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  let reversed = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversed += string[i];
  }
  return string === reversed;
}

//  ******************
const extractNumbers = (string) => {
  let result = '';
  string = string.toString();
  for (let i = 0; i <= string.length - 1; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }

  return result === '' ? NaN : Number(result);
};

//  ******************

function isMeetingWithinWorkday(startOfDay, endOfDay, meetingStart, meetingDuration) {
  // Функция для преобразования времени в минуты с начала суток
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Преобразуем входные времена в минуты
  const startOfDayMinutes = timeToMinutes(startOfDay);
  const endOfDayMinutes = timeToMinutes(endOfDay);
  const meetingStartMinutes = timeToMinutes(meetingStart);

  // Вычисляем время окончания встречи
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  // Проверяем, укладывается ли встреча в рамки рабочего дня
  return meetingStartMinutes >= startOfDayMinutes && meetingEndMinutes <= endOfDayMinutes;
}

// Примеры использования
console.log(isMeetingWithinWorkday('08:00', '17:30', '14:00', 90)); // true
console.log(isMeetingWithinWorkday('8:0', '10:0', '8:0', 120)); // true
console.log(isMeetingWithinWorkday('08:00', '14:30', '14:00', 90)); // false
console.log(isMeetingWithinWorkday('14:00', '17:30', '08:0', 90)); // false
console.log(isMeetingWithinWorkday('8:00', '17:30', '08:00', 900)); // false
