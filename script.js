let displayVal = 0;
let memoryVal = 0;
let operator = "";

const display = document.querySelector(".display")

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	if (b == 0) {
		return "ERROR";
	}
	return a / b;
}

function operate(num1, num2, op) {
	switch (op) {
		case "+":
			return add(num1, num2);
		case "-":
			return subtract(num1, num2);
		case "×":
			return multiply(num1, num2);
		case "÷":
			return divide(num1, num2);
	}
}

function allClear(event) {
    display.textContent = "";
    displayVal = 0;
}

function clickNum(event) {
    if (displayVal < 100_000_000) {
        displayVal *= 10;
        displayVal += Number(this.getAttribute('data-val'));
        display.textContent = displayVal;
    }
}

const nums = document.querySelectorAll(".num");
nums.forEach(num => num.addEventListener("click", clickNum))

const clear = document.querySelector(".clr");
clear.addEventListener("click", allClear);