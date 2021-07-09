"use strict ";

import { errorFormat } from './error';
import {	diffDates,	diffToHtml } from './diffDates';

//!__КАЛЬКУЛЯТОР ДАТ************************************


const calcDateForm = document.querySelector('#calcForm');
const calcDateResult = document.querySelector('#datecalc__result');

calcDateForm.addEventListener("submit", handleCalcDates);

function handleCalcDates(e) {
	e.preventDefault();
	calcDateResult.innerText = '';

	let {date1, date2} = e.target.elements;
	date1 = date1.value;
	date2 = date2.value;

	if (date1 && date2) {
		const result = diffDates(date1, date2);
		calcDateResult.innerHTML = diffToHtml(result);
		//console.log(diffDates(date1, date2));
		//console.log(diffToHtml(result));
	} else {
		calcDateResult.innerHTML = errorFormat('Укажите дату для обоих полей ввода');
		//@calcDateResult.classList.add('error');
	}
}

const timerForm = document.querySelector('#timerForm');
const calcForm = document.querySelector('#calcForm');
const mainBtn = document.querySelector('#mainBtn');
const setTimer = document.querySelector('#setTimer');


const show = mainBtn.addEventListener('click', () => {

	timerForm.classList.toggle('hide');
	calcForm.classList.toggle('hide');
	mainBtn.classList.toggle('blue');
});
