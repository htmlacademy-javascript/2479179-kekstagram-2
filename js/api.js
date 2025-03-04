/* eslint-disable no-alert */
/* eslint-disable no-console */
const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';


/** Массив с сервера
@returns {Promise<Array>} */

async function fetchData() {
  try {
    const response = await fetch(`${SERVER_URL}/data`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }
    const data = await response.json();
    if (!data || !Array.isArray(data)) {
      throw new Error('Некорректные данные с сервера');
    }

    return data;
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    alert('Ошибка загрузки данных. Проверьте интернет-соединение.');
    return []; // Возврат пустого массива
  }
}


/**
 * Отправка данных формы и изображения.
 * @param {HTMLFormElement} formElement - Форма
 * @returns {Promise<Object|null>} - Ответ
 */

const sendFormData = async (formElement) => {
  const formData = new FormData(formElement);
  const submitButton = formElement.querySelector('.img-upload__submit');

  submitButton.disabled = true; // Блокировка кнопки

  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      body: formData, // Отпрака данных multipart/form-data
    });

    if (!response.ok) {
      throw new Error(`Ошибка отправки формы: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка отправки формы:', error);
    return null;
  } finally {
    submitButton.disabled = false; // Анлок кнопки
  }
};

export { fetchData, sendFormData };

