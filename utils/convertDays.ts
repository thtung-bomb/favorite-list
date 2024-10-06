export function convertDaysToHoursMinutes(days: number): { hours: number, minutes: number } {
	const hours = Math.floor(days * 24);
	const minutes = Math.floor((days * 24 * 60) % 60);

	return {
		hours: hours,
		minutes: minutes,
	};
}
