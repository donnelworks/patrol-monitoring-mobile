export const timeFormat = (time) => {
    let timeArray = time?.split(":");
    let hour = timeArray[0];
    let minute = timeArray[1];
    let result = `${hour}:${minute}`;

    return result;
}

export const dateFormat = (fullDate, type, sep) => {
    let monthId = [
		"",
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"Mei",
		"Jun",
		"Jul",
		"Agt",
		"Sep",
		"Okt",
		"Nov",
		"Des",
	];
	let monthIdFull = [
		"",
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];

	let date = fullDate?.split("-")[2];
	let month = fullDate?.split("-")[1];
	let year = fullDate?.split("-")[0];

	// Date String Only Full
	if (type === "date-string-full") {
		return (
			date + sep + monthIdFull[Math.abs(month)]+ sep + year
		);
	}
	// Date String Only
	if (type === "date-string") {
		return (
			date + sep + monthId[Math.abs(month)] + sep + year
		);
	}
	// Date Number Only
	if (type === "date-number") {
		return date + sep + month + sep + year;
	}
	// Month Only Full
	if (type === "month-full") {
		return monthIdFull[Math.abs(value)];
	}
	// Month Only
	if (type === "month") {
		return monthId[Math.abs(value)] ;
	}
}