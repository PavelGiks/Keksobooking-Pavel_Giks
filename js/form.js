const mapForm = document.querySelector('.map__filters');
const formSelect = mapForm.querySelectorAll('select');
const formFieldset = mapForm.querySelector('fieldset');
const adForm = document.querySelector('.ad-form');
const adFormFieldset = adForm.querySelectorAll('fieldset');

// Неактивное состояние страницы
const deactivatePage = () => {
  mapForm.classList.add('map__filters--disabled');
  adForm.classList.add('ad-form--disabled');
  formSelect.forEach((element) => {
    element.disabled = true;
  });

  formFieldset.disabled = true;

  adFormFieldset.forEach((element) => {
    element.disabled = true;
  });
};

deactivatePage();

// Активное состояние страницы c подключением фильтров
const activatePage = () => {
  mapForm.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');

  formSelect.forEach((element) => {
    element.disabled = false;
  });

  formFieldset.disabled = false;

  adFormFieldset.forEach((element) => {
    element.disabled = false;
  });
};

activatePage ();

export { deactivatePage, activatePage };
