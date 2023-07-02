// Функция сравнения длины строки с максимально заданной длиной
const isLess = (string, length) => string.length <= length;

isLess ('Проверяемая строка', 20);
/*isLess ('Проверяемая строка', 18);
isLess ('Проверяемая строка', 10);*/

//  Функция определения палиндрома
//  Строка является палиндромом
//  имяФункции('топот'); // true
//  Несмотря на разный регистр, тоже палиндром
//  имяФункции('ДовОд'); // true
//  Это не палиндром
//  имяФункции('Кекс');  // false
//  Это палиндром
// имяФункции('Лёша на полке клопа нашёл '); // true
let isPalindrom = (string) => {
  let toString = string
    .toLowerCase()
    .replaceAll(' ', '');
  let reverseString = '';
  for (let i = toString.length - 1; i >= 0; i--) {
    reverseString += toString.at(i);
  } // я не почему мы вводим - 1.
  return toString === reverseString;
};

isPalindrom ('Лёша на полке клопа нашёл ');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// имяФункции('2023 год');            // 2023
// имяФункции('ECMAScript 2022');     // 2022
// имяФункции('1 кефир, 0.5 батона'); // 105
// имяФункции('агент 007');           // 7
// имяФункции('а я томат');           // NaN

const extractNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt(result, 10);
};

extractNumber ('a я томат');

// Функция заполнения
// Добавочный символ использован один раз
// имяФункции('1', 2, '0');      // '01'

// Добавочный символ использован три раза
// имяФункции('1', 4, '0');      // '0001'

// Добавочные символы обрезаны с конца
// имяФункции('q', 4, 'werty');  // 'werq'

// Добавочные символы использованы полтора раза
// имяФункции('q', 4, 'we');     // 'wweq'

// Добавочные символы не использованы, исходная строка не изменена
// имяФункции('qwerty', 4, '0'); // 'qwerty'

const myPadStart = (string, minLength, pad) => {
  let result = string;
  while (result.length < minLength) {
    const newResultLength = result.length + pad.length;
    const actualPad = newResultLength <= minLength ? pad : pad.slice(0, minLength - newResultLength);
    result = actualPad + result;
  }
  return result;
}

myPadStart ('q', 4, 'we');

// Функция, возвращающая случайное число с плавающей точкой

function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) return NaN;
  // В случае отрицательных значений аргументов вернет NaN
  if (b < a) [b, a] = [a, b];
  // В случае если аргумент "от" больше "до" значений аргументов поменяются местами
  // После нам нужно убедиться, что пользователь не передал дробные значения,
  // мы округляем к ближайшему большему целому с помощью Math.ceil,
  // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor
  const lower = Math.ceil(a);
  const upper = Math.floor(b);

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1],
  // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower + 1) + lower;
  // "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа
  // И в конце с помощью метода Math.floor мы округляем полученный результат,
  // потому что Math.random() генерирует только дробные числа и ноль.
  return Math.floor(result);
}
getRandomPositiveInteger(3, 5);

function getRandomPositiveFloat (a, b, digits = 1) {
  // Если переданы отрицительные числа, возвращаем NaN
  if (a < 0 || b < 0 || digits < 0) return NaN;
  if (b < a) [b, a] = [a, b];
  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1],
  // которое домножаем на разницу между переданными числами - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (b - a) + a;
  return +result.toFixed(digits);
}

getRandomPositiveFloat (1, 5, 1);

// Семен, буду честен, списал с лайва домашку, потому как было слишком много непонятного.
