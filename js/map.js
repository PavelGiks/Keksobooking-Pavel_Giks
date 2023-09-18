import {activatePage, adForm} from './form-toggle.js';
import {renderCard} from './card.js';

const COORDINATE_ROUNDING = 5;
const ZOOM_MAP = 10;

const CENTER = {
  lat: 35.70000,
  lng: 139.75000,
};

// Главная метка
const PIN_MAIN = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Метка для объявлений
const PIN_ADD = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Open source изображение
const LeafletParameters = {
  TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

// Создание изначальных координат в поле "Адрес (координаты)"
const addressForm = adForm.querySelector('#address');
const updateAddress = (location) => {
  const lat = location.lat.toFixed(COORDINATE_ROUNDING);
  const lng = location.lng.toFixed(COORDINATE_ROUNDING);
  addressForm.value = `${lat} ${lng}`;
};

// Отображение карты
const map = L.map('map-canvas')
  .on('load', () => {
    updateAddress(CENTER);
    activatePage();
  }).setView(CENTER, ZOOM_MAP);

// добавление open source изображения на созданную карту
L.tileLayer(
  LeafletParameters.TILE_LAYER,
  {
    attribution: LeafletParameters.ATTRIBUTION,
  },
).addTo(map);

// Добавление метки
const mainPin = L.marker(
  CENTER,
  {
    draggable: true,
    icon: PIN_MAIN,
  },
);

mainPin.addTo(map);

// Обработчик передвижения метки по карте
mainPin.on('move', (evt) => {
  updateAddress(evt.target.getLatLng());
});

const notice = document.querySelector('.notice');
const noticeForm = notice.querySelector('.ad-form');
const resetButton = noticeForm.querySelector('button[type="reset"]');

// Возвращение метки на исходные координаты
const resetMainPin = (marker) => {
  marker.setLatLng(CENTER);
  map.setView(CENTER, ZOOM_MAP);
};

const getResetForm = () => {
  resetMainPin(mainPin);
};

resetButton.addEventListener('click', getResetForm);

// Создание метки с объявлением
const createPinAd = (ad, layer = map) => {
  const marker = L.marker(ad.location, {icon: PIN_ADD});
  marker
    .addTo(layer)
    .bindPopup(renderCard(ad),
      {
        keepInView: true,
      },
    );
  return marker;
};

// Создание слоя с группой меток
const createMarkerGroup = (ads) => {
  const markerGroup = L.layerGroup().addTo(map);
  ads.forEach((ad) => createPinAd(ad, markerGroup));
  return markerGroup;
};

export {resetMainPin, createPinAd, createMarkerGroup};
