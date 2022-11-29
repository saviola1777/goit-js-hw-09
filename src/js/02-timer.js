import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dataInput = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('button[data-start]')
const timeValues = document.querySelectorAll('.value')

let presentTime = null;
let currentTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
  if (options.defaultDate.getTime() > selectedDates[0].getTime() ) {
  Notify.failure("Please choose a date in the future");
  startBtn.setAttribute('disabled', 'disabled');
    return;
    }
  presentTime = selectedDates[0].getTime();
 if (options.defaultDate.getTime() < selectedDates[0].getTime() ) { 
  startBtn.removeAttribute('disabled')
  }},
};
const flatpick = flatpickr('#datetime-picker', options);

startBtn.addEventListener("click", onClickStart)

function onClickStart() {
  intervalId = setInterval(runTimer, 1000);
 
}
function runTimer() {
  const deltaTime = findDeltaTime();
   if (deltaTime < 1000) clearInterval(intervalId);
  const convertTime = convertMs(deltaTime);
  changeHtmlValues(convertTime);
}

function findDeltaTime() {
  currentTime = Date.now();
  return presentTime - currentTime;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function changeHtmlValues({ days, hours, minutes, seconds }) {
  timeValues.forEach(value => {
    if (value.hasAttribute('data-days')) value.innerHTML = days;
    if (value.hasAttribute('data-hours')) value.innerHTML = hours;
    if (value.hasAttribute('data-minutes')) value.innerHTML = minutes;
    if (value.hasAttribute('data-seconds')) value.innerHTML = seconds;
  });
}




// flatpickrце легкий і потужний засіб вибору дати й часу але він не залежить від жодних бібліотек. Мінімальний інтерфейс користувача, але багато тем. npm i flatpickr --save. Бібліотека очікує, що її ініціалізують на елементі input[type="text"], тому ми додали до HTML документу поле input#datetime-picker.
// enableTime		Вмикає засіб вибору часу показуєчас на панелі
// time_24hr:		Відображає засіб вибору часу в 24-годинному режимі без вибору
// defaultDate:new Date(),	Встановлює  вибрані дати.(new Date()-це обєкт який показує дату вибрану дату )
// minuteIncrement	Ціле число		Регулює крок для введення хвилин (включно з прокручуванням)
// onClose		Функції, які запускаються щоразу, коли календар закривається
// Метод getTime()повертає кількість мілісекунд після епохи , яка визначається як опівніч на початку 1 січня 1970 року за UTC. Повертає секунди з того часу
//  Параметр selectedDates[0] Тобто це теперішня дата яка є на  даний момент (Wed Nov 30 2022 01:24:00 GMT+0200
// options.defaultDate або new Date() -це вибрана дата в минулому чи майбутньому
// Метод Date.now()повертає кількість мілісекунд, минулих 1 січня 1970 року 00:00:00 за UTC.Тобто з 1970 до вибраної дати  в мілесекундах а не до теперішньої дати
// new Date()-повертає вибрану даті в такому форматі Tue Nov 29 2022 01:02:37 GMT+0200 --- Метод Date.now() так само но в млісекундах
// let presentTime = null; значення null що ще немає значення но буде
//  let presentTime = null ----presentTime = selectedDates[0].getTime(); ми записали теперішню дату при закриті календарря в мілісекндах
// if (options.defaultDate.getTime() > selectedDates[0].getTime() ) якщо кількість мілісікунд вибраної дати буде більша за теперішню ,  тобто коли ми вибираємо дату з минулого
//  startBtn.removeAttribute('disabled') добавляємодо кнопки отрибут isabled щоб кнопка стала неактивною
// Notify.failure("Please choose a date in the future");бібліотека замість простого алерта
// if (options.defaultDate.getTime() < selectedDates[0].getTime() ) якшо кількість в мілісекундах майбутньоїдати менша за теперішню вибирає дату в майбутньому
// const flatpick = flatpickr('#datetime-picker', options);бібліотека дат де '#datetime-picker' доступ до інпута input[type="text"],
// Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів
// function onClickStart() {intervalId = setInterval(runTimer, 1000)} --буде виконувати при клікові шнтервал в одну секунду і визивати функцію runTimer
// function runTimer() {
//   const deltaTime = findDeltaTime(); тут виконується функція різницю між вибраним часом і такий яктиє є тобто наш таймер
//    if (deltaTime < 1000) clearInterval(intervalId); умова при якій удаляється інтервал якщо наш таймер мегший за секунду
//    const convertTime = convertMs(deltaTime); 
//    changeHtmlValues(convertTime); при запуску функції в зміну записує наші дати минути і секунди таймера 
// }