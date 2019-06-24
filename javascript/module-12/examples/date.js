var data = new Date();

// Методы объекта Date:
console.log(data);
console.log(data.getDate());
console.log(data.getDay()); // номер дня (0-6)
console.log(data.getFullYear()); // 1000-9999
console.log(data.getHours()); // текущее значение часов
console.log(data.getMilliseconds()); // миллисекунды
console.log(data.getMinutes()); // минуты
console.log(data.getMonth()); // месяцы (0-11)
console.log(data.getSeconds()); // секунды

// // преобразования в строку:
console.log(data.toDateString());
console.log(data.toLocaleDateString());
console.log(data.toLocaleString());
console.log(data.toString());

// Измерение времени выполнения кода:
var start = Date.now();
// ... измеряемый код...
console.log('test');
// ... конец измеряемого кода...
var stop = Date.now();
var diff = stop - start;
console.log(diff);

// Сравнение дат с помощью объекта Date:
var cmpDate = new Date();
cmpDate.setFullYear(2020, 2, 25);
var today = new Date();

// сравнение
if (cmpDate > today) {
  console.log('Будущее');
} else {
  console.log('Прошлое');
}

// Текущее время:
function getTime() {
  var now = new Date();
  var result = now.getHours() + ':' + now.getMinutes();

  return result;
}
console.log('Сейчас ' + getTime());

// Создание читаемой даты:
var tm = new Date();
var resTxt = '';
resTxt +=
  'Сейчас ' +
  tm.getHours() +
  ':' +
  tm.getMinutes() +
  ':' +
  tm.getSeconds() +
  ', ';

resTxt +=
  'дата: ' + tm.getDate() + '.' + (tm.getMonth() + 1) + '.' + tm.getFullYear();

console.log(resTxt);

// Собственная функция форматирования даты:
function showTime() {
  var monthsArr = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];

  var daysArr = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];

  var dateObj = new Date();

  var year = dateObj.getFullYear();
  var month = dateObj.getMonth();
  var numDay = dateObj.getDate();
  var day = dateObj.getDay();
  var hour = dateObj.getHours();
  var minute = dateObj.getMinutes();
  var second = dateObj.getSeconds();

  if (minute < 10) minute = '0' + minute;

  if (second < 10) second = '0' + second;

  var out =
    daysArr[day] +
    ', ' +
    numDay +
    ' ' +
    monthsArr[month] +
    ' ' +
    year +
    ', ' +
    hour +
    ':' +
    minute +
    ':' +
    second;

  return out;
}
console.log(showTime());

// Время и таймеры
var countdown = 5;
var timer = setInterval(function() {
  countdown--;
  if (!countdown) {
    clearInterval(timer);
  }

  console.log('Обратный отсчет: ' + countdown);
}, 2000); // Частота: 2000 [ms] = 2 [s]
