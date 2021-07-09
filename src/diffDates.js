import {	DateTime } from './luxon';

export function diffDates(date1, date2) {
	date1 = DateTime.fromISO(date1);
	date2 = DateTime.fromISO(date2);

	if (date1 > date2) {
		[date1, date2] = [date2, date1];
	}

	return date2.diff(date1, ['years', 'months', 'days']).toObject();
}

export const diffToHtml = diff =>
	`
	<span>
		${diff.years ? 'Лет: ' + diff.years : ''}
		${diff.months ? '<br> Месяцев: ' + diff.months : ''}
		${diff.days ? '<br> Дней: ' + diff.days : ''}
	</span>
	`;