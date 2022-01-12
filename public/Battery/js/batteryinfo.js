// VARIABLES START
const progressBar = document.getElementById("progressBar");
// const timeSpan = document.getElementById("time");
let batteryLevel, isCharging, dischTime;
// const className = changeBatteryColor(battery.level * 100);
// VARIABLES END
// FUNCTIONS Start
// Change Battery color function
let oldClassName;
function changeBatteryColor(value) {
	let className;
	if (value >= 75 && value <= 100) className = "bg-success";
	else if (value >= 50 && value <= 75) className = "bg-info";
	else if (value >= 25 && value <= 50) className = "bg-warning";
	else if (value >= 0 && value <= 25) className = "bg-danger";
	oldClassName = className;
	return className;
}

// function showDischargingTime(dischargingTime) {
//   let newTime = Math.floor(dischargingTime / 3600);
//   timeSpan.innerText = `${newTime} hours`;
// }

// Change Level function
function changeLevel(battery) {
	// console.log("level change");
	batteryLevel = `${battery.level * 100}%`;
	// Change Battery color
	if (oldClassName) {
		progressBar.classList.remove(oldClassName); // removing the prev classname
	}
	progressBar.classList.add(changeBatteryColor(battery.level * 100));
	// console.log(battery.level * 100);
	// console.log(batteryLevel);
	progressBar.setAttribute("aria-valuenow", battery.level);
	progressBar.style.width = batteryLevel;
	progressBar.innerText = batteryLevel;
}
// Animate when charging function
const changeChargingAnimation = (isCharging) => {
	if (isCharging) {
		console.log("Hi");
		progressBar.classList.add("progress-bar-animated"); // Display text "Charging..."
	} else {
		progressBar.classList.remove("progress-bar-animated"); // Display text "Charging..."
	}
	chargingTextDisplay(isCharging);
};

const chargingTextDisplay = (isCharging) => {
	if (isCharging)
		document.getElementById("chargingText").classList.remove("d-none");
	else document.getElementById("chargingText").classList.add("d-none");
};

// FUNCTIONS End

// MAIN Function Start
async function showBattery() {
	try {
		// debugger;
		const battery = await navigator.getBattery();
		// console.log(battery);
		batteryLevel = `${battery.level * 100}%`;
		isCharging = battery.charging;
		dischTime = battery.dischargingTime;
		// Change Level
		// battery.addEventListener("levelchange", () => changeLevel(battery));
		console.log(battery);
		changeLevel(battery);
		changeChargingAnimation(battery.charging);
	} catch (err) {
		console.log(err);
	}
}
// MAIN Funtion End
if ("getBattery" in navigator) {
	console.log("yessss");
	showBattery();
	setInterval(showBattery, 1000);
} else {
	console.log("Your browser does not support this app.");
	const errMessage = document.querySelector(".unsupported");
	errMessage.style.display = "block";
	document.querySelector(".supported").style.display = "none";
}
