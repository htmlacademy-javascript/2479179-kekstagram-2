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
    if (Number.isNaN (parseInt (string[i], 10)) === false) {
      result += string[i];
    }
  }

  return result === '' ? NaN : Number(result);
};
