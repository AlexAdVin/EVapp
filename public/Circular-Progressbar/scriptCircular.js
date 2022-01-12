//import { hello } from '../Battery/js/module.mjs';
//let val = hello();  // val is "Hello";
//console.log(val);

let progressBar = document.querySelector(".circular-progress");
let valueContainer = document.querySelector(".value-container");

let batteryLevel, isCharging, dischTime;

let color1 = "#17fa8e";
let color2 = "#bbff00";
let color3 = "#fffb05";
let color4 = "#ff2b05";

let oldcolor;
function changeBatteryColor(value) {
	let color;
	if (value >= 75 && value <= 100) color = color1;
	else if (value >= 50 && value <= 75) color = color2;
	else if (value >= 25 && value <= 50) color = color3;
	else if (value >= 0 && value <= 25) color = color4;
	oldcolor = color;
	return color;
}

/* Change Battery Level */
function changeLevel(battery) {
	// console.log("level change");
	batteryLevel = Math.round(battery.level * 100); //`${battery.level * 100}`
  let progressValue = batteryLevel;

  valueContainer.textContent = `${batteryLevel}%`;

  let levelColor = changeBatteryColor(battery.level * 100);

  progressBar.style.background = `conic-gradient(
    ${levelColor} ${batteryLevel * 3.6}deg,
    #323338 ${batteryLevel * 3.6}deg
  )`
}

// Animate when charging function
const changeChargingAnimation = (isCharging) => {
	if (isCharging) {
		
		//progressBar.classList.add("progress-bar-animated"); // Display text "Charging..."
	} else {
		//progressBar.classList.remove("progress-bar-animated"); // Display text "Charging..."
	}
	chargingTextDisplay(isCharging);
};

const chargingTextDisplay = (isCharging) => {
  console.log("Display text Charging...", isCharging);
  let bla = document.getElementById("chargingText");
	if (isCharging)
      bla.innerHTML = "Charging..";
	else bla.innerHTML = "Plug in"
};


// MAIN Function Start
async function showBattery() {
	try {
		// debugger;
		const battery = await navigator.getBattery();
		// console.log(battery);
		batteryLevel = `${battery.level * 100}`;
		isCharging = battery.charging;
		dischTime = battery.dischargingTime;
		// Change Level
		battery.addEventListener("levelchange", () => changeLevel(battery));
		console.log(battery);
		changeLevel(battery);
    changeBatteryColor(battery);
		changeChargingAnimation(battery.charging);
	} catch (err) {
		console.log(err);
	}
}

// MAIN Funtion End
if ("getBattery" in navigator) {
	console.log("yessss");
  showBattery();
	setInterval(showBattery, 10000);
} else {
	console.log("Your browser does not support this app.");
	//const errMessage = document.querySelector(".unsupported");
	//errMessage.style.display = "block";
	//document.querySelector(".supported").style.display = "none";
}



