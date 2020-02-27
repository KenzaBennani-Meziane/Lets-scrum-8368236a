var currentTime = new Date().getHours();
if (6 <= currentTime && currentTime < 12) {
	if (document.body) {
		document.body.className = "day";
	}
}

else if (12 <= currentTime && currentTime < 18) {
	if (document.body) {
		document.body.className = "afternoon";
	}
}

else if (18 <= currentTime && currentTime < 24) {
	if (document.body) {
		document.body.className = "night";
	}
}

else {
	if (document.body) {
		document.body.className = "midnight";
	}
}