"use strict ";

//!__TIMER__Sec__________________________________________________________________

const set2 = document.querySelector('#timer__result2');
const startTimer2 = document.querySelector('#startTimer2');
let userTime;

const f = startTimer2.addEventListener('click', (e) => {
	e.preventDefault();
	let userTimeMin = +prompt('Введите время таймера в минутах') * 60;
	let userTimeSec = +prompt('Введите время таймера в секундах');

	if (isNaN(userTimeMin) || isNaN(userTimeSec)) {
		set2.innerHTML = 'Вы ввели не число !';
		return;
	} else if (userTimeMin == 0 && userTimeSec == 0) {
		set2.innerHTML = 'Введите, пожалуйста, хотя бы секунды!';
		return;
	}
	userTime = userTimeMin + userTimeSec;

	let countDown = setInterval(function () {
		let minutes = Math.floor(userTime / 60);
		let seconds = userTime % 60;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		set2.innerHTML = `${minutes} : ${seconds}`;
		userTime--;

		if (userTime < 0) {
			set2.innerText = 'Отсчет закончен';
			clearInterval(countDown);
			soundClick();
		}
	}, 1000);
});

function soundClick() {
	let audio = new Audio();
	audio.src = './assets/sound/horn.mp3';
	audio.autoplay = true;
	setInterval(() => {
		set2.classList.toggle('red');
	}, 1000);

}