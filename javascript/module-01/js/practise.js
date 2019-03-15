/*jshint esversion: 6 */

/*
 1
 
 * - Объяви две переменные хранящие информацию о товаре: name и price
 * - Присвой переменным следующие характеристики товара (сразу при объявлении)
 *   - название: Генератор защитного поля
 *   - цена: 1000
 * - Присвой товару новую цену - 2000
 * - Используя шаблонную строку выведи в консоли информацию о товаре, 
 *   получится "Выбран «Генератор защитного поля», цена за штуку 2000 кредитов"
 */

const name = "Генератор защитного поля";
let price = 1000;
price = 2000;
console.log(`Выбран «${name}», цена за штуку ${price} кредитов`);

/*
  2

  Есть три переменные содержащие составляющие даты: день, месяц, и год. 
  
  Создай переменную date, в которую запиши полную дату в формате день\месяц\год
  Создай переменную message, в которую запиши сообщение "Доброе утро, cегодня 17\10\2048, за бортом отличная погода!"
  
  PS: используя шаблонные строки.
*/

const day = 17;
const month = 10;
const year = 2048;

const date = `${day}\\${month}\\${year}`;
const message = `Доброе утро, cегодня ${date}, за бортом отличная погода!`;

console.log(date); // 17\10\2048
console.log(message); // "Доброе утро, cегодня 17\10\2048, за бортом отличная погода!"

/*
  3

  Есть три переменные name, date и roomType, содержащие имя гостя, 
  дату его прибытия на отдых и тип комнаты отеля.
  
  Создай переменную message и используя шаблонные строки запиши в нее сообщение формата:
  "имя гостя" прибывает на отдых "дата прибытия" в "тип комнаты".
*/

const guestName = "Mango";
const arrivalDate = "14/08/2137";
const roomType = "люкс";

const info = `${guestName} прибывает на отдых ${arrivalDate} в ${roomType}`;

console.log(info); // Mango прибывает на отдых 14/08/2137 в люкс

/*
  4

  Напиши скрипт который: 
  
  - При посещении страницы через prompt cпрашивает 'Введите пароль доступа'
  
  - Если был нажат Cancel в prompt, показывать alert с сообщением 'Ожидаю ввода пароля'.
  
  - Если введенное значение совпадает со значением переменной correctPassword, 
    показывать alert со сообщением 'Доступ в секретный бункер разрешен!'
    
  - Если что-то другое — показывать alert с сообщением 'Активирована система защиты!'
*/

const correctPassword = "123";

const password = prompt('Введите пароль доступа');
let alertMessage = "Доступ в секретный бункер разрешен!";

if (password === null) {
  alertMessage = 'Ожидаю ввода пароля';
} else if (password !== correctPassword) {
  alertMessage = 'Активирована система защиты!';
}

alert(alertMessage);

/*
  5
  
  Необходимо написать скрипт проверки количества товаров на складе.
  Есть переменные total (количество товаров на складе) и ordered (единиц товара в заказе).
  
  Сравни эти значения и по результатам выведи:
  
    - Если в заказе указано число, превышающее количество товаров на складе, то выведи сообщение "На складе недостаточно твоаров!"
    - Если в заказе указано число товаров, равное количеству товара на складе, то выведи сообщение "Вы забираете весь товар cо склада!"
    - В иных случаях выводи сообщение "Заказ оформлен, с вами свяжется менеджер"
    
  Проверь работоспособность кода с разными значениями переменной ordered.
*/

const total = 100;
const ordered = prompt('Введите необходимое вам количество единиц товара');
let result = "Заказ оформлен, с вами свяжется менеджер";

if (Number(ordered) > total) {
  result = "На складе недостаточно твоаров!";
} else if (Number(ordered) === total) {
  result = "Вы забираете весь товар cо склада!";
}

alert(result);

/*
  6

  Напиши скрипт который: 
 
  - Через prompt cпрашивает 'Введите произвольное целое число'
  - Если пользователь нажал Cancel - показывать alert 'Ну и ладно, пока!'
  - Если посетитель вводит целое число - показывать alert со строкой 'Спасибо!'
  - Если посетитель вводит что либо другое — показывать alert 'Необходимо было ввести целое число!'
*/

const num = prompt('Введите произвольное целое число');
let resultMessage = "Спасибо!";

if (num === null) {
  resultMessage = 'Ну и ладно, пока!';
} else if (Math.round(Number(num)) !== Number(num)) {
  resultMessage = 'Необходимо было ввести целое число!';
}

alert(resultMessage);

/* 
  7

  В переменную value записывается случайное число.
  
  Объяви переменную type, в которую, используя ветвления запиши строку:  
    - "even" если value четное
    - "odd" если value не четное

  PS: попробуй использовать тернарный оператор
*/

const value = Number.parseInt(Math.random() * 100);

const type = value % 2 === 0 ? "even" : "odd";

console.log(`${value} is ${type}`);

/* 
  8
  
  Создай скрипт поиска отелей, где пользователь 
  с помощью prompt должен ввести число от 1 до 5
  
  Проверить что пользователь ввел именно цифру от 1 до 5
  
  Если пользователь нажал Cancel, то выведи alert с текстом 'Очень жаль, приходите еще!'
  
  Если было введено что либо кроме чисел 1-5, вывести alert с текстом 'Неверный ввод, возможные варианты 1-5!'
  
  Если же пользовател ввел валидное число, используя switch, вывести alert с одной из строк:
  
    1 - "Каталог хостелов" 
    2 - "Каталог бюджетных отелей"
    3 - "Каталог отелей ***"
    4 - "Каталог отелей ****"
    5 - "Каталог лучших отелей"
*/

const hotelStar = prompt("Введите класс оттеля от 1 до 5");
let searchResult;

if (hotelStar === null) {
  searchResult = "Очень жаль, приходите еще!";
} else {
  switch (hotelStar) {
    case "1":
      searchResult = "Каталог хостелов";
      break;

    case "2":
      searchResult = "Каталог бюджетных отелей";
      break;

    case "3":
      searchResult = "Каталог отелей ***";
      break;

    case "4":
      searchResult = "Каталог отелей ****";
      break;

    case "5":
      searchResult = "Каталог лучших отелей";
      break;

    default:
      searchResult = "Неверный ввод, возможные варианты 1-5!";
  }
}

alert(searchResult);

