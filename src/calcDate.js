"use strict ";

//!__КАЛЬКУЛЯТОР ДАТ************************************

const calcDateForm = document.querySelector('#calcForm');
const calcDateResult = document.querySelector('#datecalc__result');

calcDateForm.addEventListener("submit", handleCalcDates);


const errorFormat = text => `
	<span class="error">${ text }</span>
`;

const diffToHtml = diff =>
	`
	<span>
		${diff.years ? 'Лет: ' + diff.years : ''}
		${diff.months ? '<br> Месяцев: ' + diff.months : ''}
		${diff.days ? '<br> Дней: ' + diff.days : ''}
	</span>
	`;


function handleCalcDates(e) {
	e.preventDefault();
	calcDateResult.innerText = '';

	let {
		date1,
		date2
	} = e.target.elements;
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



function diffDates(date1, date2) {
	date1 = DateTime.fromISO(date1);
	date2 = DateTime.fromISO(date2);

	if (date1 > date2) {
		[date1, date2] = [date2, date1];
	}

	return date2.diff(date1, ['years', 'months', 'days']).toObject();
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
