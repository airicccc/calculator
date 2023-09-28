let displayVal = 0;
let memoryVal = 0;
let equVal = 0;
let operator = "";
let hasDisplay = false;
let isDecimal = false;

const display = document.querySelector(".display");

function add(a, b) {
	let result = a + b;
	if (result > 999_999_999 || result < -999_999_999) {
		return "ERROR";
	}
	return result;
}

function subtract(a, b) {
	let result = a - b;
	if (result > 999_999_999 || result < -999_999_999) {
		return "ERROR";
	}
	return result;
}

function multiply(a, b) {
	let result = a * b;
	if (result > 999_999_999 || result < -999_999_999) {
		return "ERROR";
	}
	return result;
}

function divide(a, b) {
	if (b == 0) {
		return "ERROR";
	}
	let result = a / b;
	if (result > 999_999_999 || result < -999_999_999) {
		return "ERROR";
	}
	let int = result.toString().split(".")[0];
	console.log(int);
	let len = int.length;
	result = parseFloat(result.toFixed(9 - len));
	return result;
}

function operate(num1, num2, op) {
	switch (op) {
		case "add":
			return add(num1, num2);
		case "sub":
			return subtract(num1, num2);
		case "mul":
			return multiply(num1, num2);
		case "div":
			return divide(num1, num2);
	}
}

function clickOp(event) {
	if (hasDisplay) {
		if (operator == "") {
			memoryVal = displayVal;
			displayVal = 0;
			hasDisplay = false;
			operator = this.getAttribute("data-op");
		} else {
			memoryVal = operate(memoryVal, displayVal, operator);
			equVal = memoryVal;
			display.textContent = memoryVal;
			displayVal = 0;
			hasDisplay = false;
			operator = this.getAttribute("data-op");
			console.log(displayVal, memoryVal);
		}
	} else {
		operator = this.getAttribute("data-op");
	}
}

function clickEqu(event) {
	if (memoryVal == "ERROR") {
		return;
	}
	if (hasDisplay) {
		if (operator == "") {
			memoryVal = displayVal;
			displayVal = 0;
			hasDisplay = false;
		} else {
			memoryVal = operate(memoryVal, displayVal, operator);
			display.textContent = memoryVal;
			equVal = displayVal;
			displayVal = 0;
			hasDisplay = false;
		}
	} else if (operator != "") {
		memoryVal = operate(memoryVal, equVal, operator);
		display.textContent = memoryVal;
	}
}

function clickPer(event) {
	if (hasDisplay) {
        if (displayVal == "ERROR") return;
		displayVal /= 100;
		let int = displayVal.toString().split(".")[0];
		let len = int.length;
		displayVal = parseFloat(displayVal.toFixed(9 - len));
        if (Math.abs(displayVal) < 1 / 100_000_000) {
            displayVal = "ERROR"
        }
		display.textContent = displayVal;
	} else {
        if (memoryVal == "ERROR") return;
		memoryVal /= 100;
        let int = memoryVal.toString().split(".")[0];
		let len = int.length;
		memoryVal = parseFloat(memoryVal.toFixed(9 - len));
        if (Math.abs(memoryVal) < 1 / 100_000_000) {
            memoryVal = "ERROR"
        }
		display.textContent = memoryVal;
	}
}

function clickPM(event) {
	if (hasDisplay) {
        if (displayVal == "ERROR") return;
		displayVal *= -1;
		display.textContent = displayVal;
	} else {
        if (memoryVal == "ERROR") return;
		memoryVal *= -1;
		display.textContent = memoryVal;
	}
}

function allClear(event) {
	display.textContent = "";
	displayVal = 0;
	memoryVal = 0;
	equVal = 0;
	operator = "";
	hasDisplay = false;
    isDecimal = false;
}

function clickNum(event) {
	if (memoryVal == "ERROR") {
		allClear();
	}
	if (displayVal < 100_000_000) {
		displayVal *= 10;
		displayVal += Number(this.getAttribute("data-val"));
		display.textContent = displayVal;
	}
	hasDisplay = true;
}

const nums = document.querySelectorAll(".num");
nums.forEach((num) => num.addEventListener("click", clickNum));

const ops = document.querySelectorAll("#op");
ops.forEach((op) => op.addEventListener("click", clickOp));

const equals = document.querySelector("#equ");
equals.addEventListener("click", clickEqu);

const plusminus = document.querySelector("#pm");
plusminus.addEventListener("click", clickPM);

const clear = document.querySelector("#clr");
clear.addEventListener("click", allClear);

const percent = document.querySelector("#per");
percent.addEventListener("click", clickPer);
