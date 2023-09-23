import { ErrorPopup } from './consts.js';

const URL = 'https://28.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(
    `${URL}/data`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => onError(ErrorPopup.ERROR_GET));
};

const sendData = (onSuccess, onError, bodyData) => {
  fetch(
    URL,
    {
      method: 'POST',
      body: bodyData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => onError());
};

export { getData, sendData };
