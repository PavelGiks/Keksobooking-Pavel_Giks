const form = document.querySelector('.ad-form');
const title = form.querySelector('#title');
const price = form.querySelector('#price');
const rooms = form.querySelector('#room_number');
const guests = form.querySelector('#capacity');
const type = document.querySelector('#type');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text'
});

const TitleSizes = {
  min: 30,
  max: 100
};
const Price = {
  min: 0,
  max: 100000
};

const typePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

// Валидация заголовка объявления
const validateTitle = (value) => value.length >= TitleSizes.min && value.length <= TitleSizes.max;
const getErrorTitleMessage = (value) => {
  if (value.length <= TitleSizes.min) {
    return `Минимальная длина ${TitleSizes.min} символов`;
  } else if (value.length > TitleSizes.max) {
    return `Максимальная длина ${TitleSizes.max} символов`;
  } else {
    return 'Обязательное поле';
  }
};
pristine.addValidator(title, validateTitle, getErrorTitleMessage);
// Валидация цены за ночь
const validatePrice = () => Number(price.value) >= typePrice[type.value] && Number(price.value) <= Price.max;
const getErrorPriceMessage = () => {
  if (Number(price.value) <= typePrice[type.value]) {
    return `Минимальная цена для выбранного типа жилья ${typePrice[type.value]}`;
  } else if (Number(price.value) > Price.max) {
    return `Максимальная цена должна быть меньше ${Price.max}`;
  } else {
    return 'Обязательное поле';
  }
};
pristine.addValidator(price, validatePrice, getErrorPriceMessage);

// Валидация количества комнат и количества мест
const validateRoomsAndGuests = () => (Number(guests.value) <= Number(rooms.value) && Number(rooms.value) !== 100 && Number(guests.value) !== 0) || (Number(rooms.value) === 100 && Number(guests.value) === 0);
const getErrorRoomsMessage = () => {
  if (Number(rooms.value) < Number(guests.value)) {
    return 'Количество гостей не должно превышать количество комнат';
  }else if(Number(guests.value) !== 100 && Number(guests.value) === 0) {
    return 'не для гостей выбирайте 100 комнат';
  }
};
const getErrorGuestsMessage = () => {
  if (Number(guests.value) > Number(rooms.value)) {
    return 'Количество комнат не может быть меньше количества гостей';
  } else if(Number(rooms.value) === 100 && Number(guests.value) !== 0) {
    return '100 комнат это не для гостей';
  }
};
pristine.addValidator(guests, validateRoomsAndGuests, getErrorRoomsMessage);
pristine.addValidator(rooms, validateRoomsAndGuests, getErrorGuestsMessage);

type.addEventListener('change', () => {
  price.placeholder = typePrice[type.value];
  pristine.validate(price);
});

// Валидация въезд-выезд
timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
});

// слайдер
noUiSlider.create(sliderElement, {
  range: {
    min: Price.min,
    max: Price.max,
  },
  start: Price.min,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
});

price.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions(
    {start:price.value},
    false
  );
});
