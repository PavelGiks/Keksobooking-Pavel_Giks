import { DEBOUNCE_DELAY } from './consts.js';
import { renderPointsToMap, clearMap } from './map.js';

const PriceValueToTypes = {
  LOW: 10000,
  MIDDLE: {
    low: 10000,
    high: 50000,
  },
  HIGH: 50000,
};
const PriceTypes = {
  ANY: 'any',
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const mapFilter = document.querySelector('.map__filters');
const selectType = mapFilter.querySelector('#housing-type');
const selectPrice = mapFilter.querySelector('#housing-price');
const selectRooms = mapFilter.querySelector('#housing-rooms');
const selectGuests = mapFilter.querySelector('#housing-guests');
const fieldsetFeatures = mapFilter.querySelector('#housing-features');

let defaultPoints = [];

const getFilteredPointsToPrice = (point, price) => {
  if (price === PriceTypes.LOW) {
    return point.offer.price < PriceValueToTypes.LOW;
  }
  if (price === PriceTypes.MIDDLE) {
    return point.offer.price <= PriceValueToTypes.MIDDLE.high && point.offer.price >= PriceValueToTypes.MIDDLE.low ;
  }
  if (price === PriceTypes.HIGH) {
    return point.offer.price > PriceValueToTypes.HIGH;
  }
  return true;
};

const getFilteredPointsToRoom = (point, room) => {
  if (room !== 'any') {
    return point.offer.rooms === Number(room);
  }
  return true;
};

const getFilteredPointsToGuest = (point, guest) => {
  if (guest !== 'any') {
    return point.offer.guests === Number(guest);
  }
  return true;
};

const getFilteredPointsToType = (point, type) => {
  if (type === 'any') {
    return true;
  }
  return point.offer.type === type;
};

const getFilteredPointsToFeatures = (point, features) => {
  if (!point.offer.features) {
    return false;
  }
  const pointFeatures = point.offer.features;
  const difference = features.filter((feature) => !pointFeatures.includes(feature));
  if (difference.length === 0) {
    return true;
  }
  return false;
};

const getFilteredPointToAllParameters = (filterParameters) => {
  const filteredPoints = defaultPoints.filter((point) => getFilteredPointsToFeatures(point, filterParameters.features) && getFilteredPointsToType(point, filterParameters.type)
  && getFilteredPointsToPrice(point, filterParameters.price) && getFilteredPointsToRoom(point, filterParameters.room) && getFilteredPointsToGuest(point, filterParameters.guest));
  return filteredPoints;
};

const onMapFilterChange = () => {
  const activeCheckboxElements = fieldsetFeatures.querySelectorAll('input:checked');
  const featuresValues = Array.from(activeCheckboxElements).map((element) => element.value);
  clearMap();
  const filterParameters = {
    type: selectType.value,
    price: selectPrice.value,
    room: selectRooms.value,
    guest: selectGuests.value,
    features: featuresValues,
  };

  renderPointsToMap(getFilteredPointToAllParameters(filterParameters));
};

const startFilter = (data) => {
  defaultPoints = data;
  mapFilter.addEventListener('change', debounce(onMapFilterChange));
};

const resetFilter = () => {
  mapFilter.reset();
  clearMap();
  renderPointsToMap(defaultPoints);
};

export { startFilter, resetFilter };
