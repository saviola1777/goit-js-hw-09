const startBtn = document.querySelector('button[data-start]')
const stopBtn = document.querySelector('button[data-stop]')
const changeColor=document.querySelector('body')
 
function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener("click", onClickStart)
stopBtn.addEventListener("click", onClickStop)

let timerId = null;

function onClickStart(evn) {
timerId = setInterval(() =>
 changeColor.style.backgroundColor = getRandomHexColor(), 1000)
  if (evn.currentTarget) {
  startBtn.setAttribute('disabled','disabled')
    }
}

function onClickStop(evn) {
  clearInterval(timerId)
 startBtn.removeAttribute('disabled','disabled')
}

// null представляє відсутність будь-якого об'єктного значення , nullчасто присутні в місцях, де очікується об'єкт, але відповідного об'єкта немає.
