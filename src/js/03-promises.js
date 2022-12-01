import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', onSumbit);

function onSumbit(event) {
  event.preventDefault();
  let delayVal = Number(refs.delay.value);
  const stepVal = Number(refs.step.value);
  const amountVal = Number(refs.amount.value);
  
  for (let position = 1; position <= amountVal; position += 1){
    delayVal += position === 1 ? 0 : stepVal;
    createPromise({ position, delayVal })
     
      .then(onSucces)
      .catch(onError);
   }
}

function createPromise({ position, delayVal }) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delayVal });
      } else {
        reject({ position, delayVal })
      }
    }, delayVal)
  )};

function onSucces({ position, delayVal }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delayVal}ms`);
}

function onError({ position, delayVal }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delayVal}ms`);
}
// Проміс створюється як екземпляр класу Promise, який приймає функцію (executor) як аргумент і відразу викликає її, ще до створення і повернення промісу.
// resolve(value) - функція для виклику у разі успішної операції. Переданий їй аргумент буде значенням виконаного промісу.
// reject(error) - функція для виклику у разі помилки. Переданий їй аргумент буде значенням відхиленого промісу

//  event.preventDefault(); відміна дій браузера по замовчувані . наприклад при самбіті має бути перехід на інщу сторінку то його не буде

// function createPromise({ position, delayVal }) {-------- це функція яка приймаєдва параметра { position, delayVal } це обєкт тобто їхні значення
//   const shouldResolve = Math.random() > 0.3; --------- вибираєрандомне рандомне число > 0.3
  // return new Promise((resolve, reject) => -----сторюємо проміс (обіцянку ) де (resolve) функція для виклику у разі успішної операції , reject(error) - функція для виклику у разі помилки.
//     setTimeout(() => {   ------------- викликає метод отложиног таймаютя
//       if (shouldResolve) {------ якщо рандомне число більше 0.3 то це правда 
//         resolve({ position, delayVal });----- і виконується функція успішної операції
//       } else {
//         reject({ position, delayVal })------ в іншому випадку виконується функції виклику у разі помилки
//       }
//     }, delayVal)=------------ кількість секунд в методі setTimeout час черзе який буде виконуватися функція setTimeout
//   )};

// function onSucces({ position, delayVal }) {  ------- функція яка передає два параметра 
//   Notify.success(`✅ Fulfilled promise ${position} in ${delayVal}ms`);}--- бібліотека резкльтат

// refs.form.addEventListener('submit', onSumbit);------- обробник події при отпраки форми 

// function onSumbit(event) {
//   event.preventDefault();-------- відміна дії брацзера зазамовчуванням тобто перезагрузка 
//   let delayVal = Number(refs.delay.value);-----передає значення вписаних в импутнах приклад (1000)
//   const stepVal = Number(refs.step.value);-----передає значення вписаних в импутнах приклад (500)
//   const amountVal = Number(refs.amount.value);-----передає значення вписаних в импутнах приклад (4)
  
//   for (let position = 1; position <= amountVal; position += 1){--тут ми перебираємо і визначаємо position 
//     delayVal += position === 1 ? 0 : stepVal; ----буде додавати на кожній ітерації stepVal но пропускатиме першу ітераціюдодавання 
//     createPromise({ position, delayVal })----передаємо position і delayVal якшо amountVal=4 , то значить шо бупершаде 4 ітерації delayVal=1000 а const stepVal=500 то ,

     
//       .then(onSucces)
//       .catch(onError);
//    }
// }

// На практиці в методі then() обробляють тільки успішне виконання промісу, а помилку його виконання у спеціальному методі catch() для «відловлювання» помилок.
// Після створення промісу, його результат обробляється в callback-функції. Код пишеться таким чином, ніби ми думаємо про те, що може статися, якщо проміс виконається або не виконається, не думаючи про часові рамки.

// Метод then() приймає два аргументи - callback-функції, які будуть викликані, коли проміс змінить свій стан. Результат промісу, значення або помилку, вони отримають як аргументи.