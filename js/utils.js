// Возвращает случайное целое число
function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  if (b < a) {
    [b, a] = [a, b];
  }
  const lower = Math.ceil(a);
  const upper = Math.floor(b);
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Возвращает случайное целое число с плавающей точкой
function getRandomPositiveFloat (a, b, digits = 1) {
  // Если переданы отрицительные числа, возвращаем NaN
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  if (b < a) {
    [b, a] = [a, b];
  }
  const result = Math.random() * (b - a + 1) + a;
  return +result.toFixed(digits);
}

// Возвращает случайный элемент из массива
const getRandomElement = (element) => {
  const random = Math.floor(Math.random() * (element.length - 1));
  return element[random];
};


//Возвращает массив случайной длины из случайных неповторяющихся значений
const getRandomArray = (array) => {
  const randomArray = new Array (getRandomPositiveInteger(1, array.length - 1)).fill(' ').map(() => (getRandomElement(array)));
  const uniqueElementsArray = [...new Set(randomArray)];
  return uniqueElementsArray;
};

//Создает случайные координаты

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomElement, getRandomArray};
