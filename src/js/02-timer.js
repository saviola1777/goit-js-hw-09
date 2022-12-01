import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dataInput = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('button[data-start]')
const timeValues = document.querySelectorAll('.value')

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
  
 if (options.defaultDate.getTime() < selectedDates[0].getTime() ) { 
   startBtn.removeAttribute('disabled')
   presentTime = selectedDates[0].getTime();
   console.log(selectedDates[0])
   console.log(options.defaultDate)
  }},
};

const flatpick = flatpickr('#datetime-picker', options); 

startBtn.addEventListener("click", onClickStart)
  function onClickStart() {
  timer.start()
}
let presentTime = null;
 
const timer = {
  intervalId: null,
  isActive:false,
    start() {
      if (this.isActive) return;
      this.isActive = true;
      
      this.intervalId = setInterval(() => {
     const currentTime = Date.now()
     const deltaTime = presentTime - currentTime;
     if(deltaTime<1000)clearInterval(this.intervalId);
      console.log(deltaTime)
        const convertTime = convertMs(deltaTime);
        changeHtmlValues(convertTime)
         },1000)
  },
 }

  
function pad(value) {
  return String(value).padStart(2, '0');
}

  function convertMs(ms) {
 
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
    if (value.hasAttribute('data-days')) value.textContent = days;
    if (value.hasAttribute('data-hours')) value.textContent = hours;
    if (value.hasAttribute('data-minutes')) value.textContent = minutes;
    if (value.hasAttribute('data-seconds')) value.textContent = seconds;
  });
}








// flatpickr це легкий і потужний засіб вибору дати й часу але він не залежить від жодних бібліотек. npm i flatpickr --save.
// flatpickr-Бібліотека очікує, що її ініціалізують на елементі input[type = "text"], тому ми додали до HTML документу поле input#datetime - picker.
//const flatpick = flatpickr('#datetime-picker', options);  Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів

// enableTime		Показує самий годиник
// time_24hr:		Відображає засіб вибору часу в 24-годинному режимі без вибору
// defaultDate:new Date(),	(new Date()-це обєкт який показує дату теперішнюдату на даний момент)
// minuteIncrement	Ціле число		Регулює крок для введення хвилин (включно з прокручуванням)
 
// onClose		Функції, які запускаються щоразу, коли календар закривається
// Метод getTime()повертає кількість мілісекунд після епохи , яка визначається як опівніч на початку 1 січня 1970 року за UTC. Повертає секунди з того часу
//  selectedDates[] - це масив обраних дат, тому ми беремо перший елемент.Тобто це число яке ми  (Wed Nov 10 2022 01:24:00 GMT+0200)
// options.defaultDate або new Date() -це теперішнє число таке яке є на даний момент
// Метод Date.now() це теперішня дата наша но не як (Tue Nov 29 2022 01:02:37 GMT+0200) а в мілісекундах від 1 січня 1970 року за UTC (2176371231471)
// new Date()-повертає вибрану даті в такому форматі Tue Nov 29 2022 01:02:37 GMT+0200 --- Метод Date.now(2176371231471) так само но в млісекундах
// let presentTime = null; значення null що ще немає значення но буде це просто як пусте місце що потім заповнеться

// if (options.defaultDate.getTime() > selectedDates[0].getTime() ) якщо теперішня дата в міліс буде більша за за дату яку вибрали
//  startBtn.removeAttribute('disabled') добавляємодо кнопки отрибут isabled щоб кнопка стала неактивною
// Notify.failure("Please choose a date in the future");бібліотека замість простого алерта
// let presentTime = null;--presentTime = selectedDates[0].getTime(); це та дата яку ми вибрали і перевели в мілісекунди .getTime()

//  function onClickStart() { timer.start()} ця функція запусти наш обєкт в якому є функція start()







































// import "flatpickr/dist/flatpickr.min.css";
// import flatpickr from "flatpickr";
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const dataInput = document.querySelector('#datetime-picker')
// const startBtn = document.querySelector('button[data-start]')
// const timeValues = document.querySelectorAll('.value')


// let presentTime = null;
// let currentTime = null;
// let intervalId = null;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//   if (options.defaultDate.getTime() > selectedDates[0].getTime() ) {
//   Notify.failure("Please choose a date in the future");
//   startBtn.setAttribute('disabled', 'disabled');
//     return;
//     }
//   presentTime = selectedDates[0].getTime();
//  if (options.defaultDate.getTime() < selectedDates[0].getTime() ) {
//   startBtn.removeAttribute('disabled')
//   }},
// };
// const flatpick = flatpickr('#datetime-picker', options);

// startBtn.addEventListener("click", onClickStart)

// function onClickStart() {
//   intervalId = setInterval(runTimer, 1000);
 
// }
// function runTimer() {
//   const deltaTime = findDeltaTime();
//    if (deltaTime < 1000) clearInterval(intervalId);
//   const convertTime = convertMs(deltaTime);
//   changeHtmlValues(convertTime);
// }

// function findDeltaTime() {
//   currentTime = Date.now();
//   return presentTime - currentTime;
// }

// function pad(value) {
//   return String(value).padStart(2, '0');
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = pad(Math.floor(ms / day));
//   const hours = pad(Math.floor((ms % day) / hour));
//   const minutes = pad(Math.floor(((ms % day) % hour) / minute));
//   const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
//   return { days, hours, minutes, seconds };
// }

// function changeHtmlValues({ days, hours, minutes, seconds }) {
//   timeValues.forEach(value => {
//     if (value.hasAttribute('data-days')) value.innerHTML = days;
//     if (value.hasAttribute('data-hours')) value.innerHTML = hours;
//     if (value.hasAttribute('data-minutes')) value.innerHTML = minutes;
//     if (value.hasAttribute('data-seconds')) value.innerHTML = seconds;
//   });
// }




