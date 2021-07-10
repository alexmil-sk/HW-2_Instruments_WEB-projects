"use strict ";

import { errorFormat } from './error';


const TimerX = setInterval(() => {
	const set1 = document.querySelector('#timer__result1');
	const timerDate1 = document.querySelector('#timerDate1');
	const timerDate2 = document.querySelector('#timerDate2');
	const pauseTimer = document.querySelector('#pauseTimer');
	const restartTimer = document.querySelector('#restartTimer');
	const resetTimer = document.querySelector('#resetTimer');
	let endTimer = new Date(timerDate2.value).getTime();
	let startTimer = new Date().getTime();

	const today = new Date();
	let d = today.getDate();
	let m = today.getMonth() + 1;
	let y = today.getFullYear();

	if (d < 10) {
		d = '0' + d;
	}

	if (m < 10) {
		m = '0' + m;
	}

	timerDate1.innerHTML = d + ' / ' + m + ' / ' + y;
	let difference = endTimer - startTimer;
	if (endTimer) {
		//let difference = endTimer - startTimer;
		let day = Math.floor(difference / (1000 * 60 * 60 * 24));
		let hour = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		minutes = minutes < 10 ? '0' + minutes : minutes;
		let seconds = Math.floor((difference % (1000 * 60)) / (1000));
		seconds = seconds < 10 ? '0' + seconds : seconds;
		set1.innerHTML = day + ' дней ' + hour + ' часов ' + minutes + ' минут ' + seconds + ' секунд ';
		set1.classList.remove('error');
		set1.classList.add('bold');
		if (difference == 0) {
			set1.innerHTML = 'Отсчет закончен';
		}
	} else {
		set1.innerHTML = errorFormat('Укажите конечную дату отсчета!');
	}

	if (difference < 0) {
		set1.innerHTML = errorFormat('Введите конечную дату отсчета находящуюся в будущем временном периоде!');
	} 

	pauseTimer.addEventListener('click', (e) => {
		e.preventDefault();
		set1.classList.add('error');
		clearInterval(TimerX);
	});

	resetTimer.addEventListener('click', (e) => {
		set1.innerHTML = '';
	});

}, 1000);