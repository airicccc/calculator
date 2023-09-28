let displayVal = 0;
let memoryVal = 0;
let equVal = 0;
let operator = "";
let hasDisplay = false;
let isDecimal = false;
const maxDigits = 9;
const percentNum = 100;
const maxVal = 999_999_999;
const minVal = -999_999_999;
const maxDisplay = 100_000_000;
const minDecimal = 1 / 100_000_000;

const display = document.querySelector(".display");

function add(a, b) {
	let result = a + b;
	if (result > maxVal|| result < minVal) {
		return "ERROR";
	}
	return result;
}

function subtract(a, b) {
	let result = a - b;
	if (result > maxVal|| result < minVal) {
		return "ERROR";
	}
	return result;
}

function multiply(a, b) {
	let result = a * b;
	if (result > maxVal|| result < minVal) {
		return "ERROR";
	}
	return result;
}

function divide(a, b) {
	if (b == 0) {
		return "ERROR";
	}
	let result = a / b;
	if (result > maxVal|| result < minVal) {
		return "ERROR";
	}
	return truncate(result);
}

function truncate(num) {
	let intPart = num.toString().split(".")[0];
	let len = intPart.length;
	return parseFloat(num.toFixed(maxDigits - len));
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
        if (displayVal == "ERROR" | displayVal == 0) return;
		displayVal = truncate(displayVal / percentNum)
        if (Math.abs(displayVal) < minDecimal) {
            displayVal = "ERROR"
        }
		display.textContent = displayVal;
	} else {
        if (memoryVal == "ERROR" || memoryVal == 0) return;
		memoryVal = truncate(memoryVal / percentNum);
        if (Math.abs(memoryVal) < minDecimal) {
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
	if (displayVal < maxDisplay) {
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
