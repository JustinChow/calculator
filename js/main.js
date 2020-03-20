function add (a, b) {
	return parseFloat(a) + parseFloat(b);
}

function subtract (a, b) {
	return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
  return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
  return parseFloat(a) / parseFloat(b);
}

function operate(a, b, operator) {
  if (operator === "*") {
    return multiply(a,b);
  }
  else if (operator === "+") {
    return add(a,b);
  }
  else if (operator === "-") {
    return subtract(a,b);
  }
  else if (operator === "/") {
    return divide(a,b);
  }
}
  
function calculateAnswer(input) {
  while (input.length > 1) {
    operatorIndex = input.findIndex(e => e === "*" || e === "/");
    if (operatorIndex < 0) {
      operatorIndex = input.findIndex(e => e === "+" || e === "-");
    }
    currOperation = input.slice(operatorIndex - 1, operatorIndex + 2);
    if (currOperation[1] == "/" && currOperation[2] == "0") {
      alert("You can't divide by 0!");
      return "ERROR";
    }
    result = operate(currOperation[0], currOperation[2], currOperation[1]);
    input.splice(operatorIndex-1,3, result);
  }
  return input;
}

function handleNumberClick(e) {
  const key = this.getAttribute("data-key");
  if (currNumber === "" && input.length == 1) {
    input.pop();
  }
  if (currNumber === "0") {
    currNumber = "";
  }
  
  newNumber = currNumber + key;
  display.textContent = newNumber;
  currNumber = newNumber;
}

function handleEqualClick(e) {
  if(currNumber) {
    input.push(currNumber);
    currNumber = "";
  }

  if (operators.includes(input[input.length-1])) {
    input.pop();
  }

  console.log(input);
  let result = calculateAnswer(input);


  if (result === "ERROR") {
    input = [];
    display.textContent = "";
  }
  else {
    result = result.toString();
    result = result.slice(0, 12);
    result = parseFloat(result);
    result *= 10 ** 11;
    result = Math.round(result);
    result /= 10 ** 11;
    display.textContent = result;
  }
  
}

function handleOperatorClick(e) {
  if (currNumber) {
    input.push(currNumber);
    currNumber = "";
  }
  if (operators.includes(input[input.length-1])) {
    input.pop();
  }
  if (!isNaN(input[input.length-1])) {
    const key = this.getAttribute("data-key");;
    if (key) {
      input.push(key);
    }
  }
}

function handleClearClick(e) {
  display.textContent = "";
  input = [];
}

function handleDecimalClick(e) {
  if (!currNumber) {
    currNumber += "0.";
  }
  else if (!currNumber.includes(".")) {
    currNumber += ".";
  }
  display.textContent = currNumber;
}

const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number-button");
const clearButton = document.querySelector("#button-clear");
const equalButton = document.querySelector("#button-equal");
const operatorButtons = document.querySelectorAll(".operator-button");
const buttonDecimal = document.querySelector("#button-decimal");

let input = [];
let currNumber = ""
const operators = ["*","/","+","-"];

numberButtons.forEach(button => button.addEventListener("click", handleNumberClick));
clearButton.addEventListener("click", handleClearClick);
equalButton.addEventListener("click", handleEqualClick);
operatorButtons.forEach(button => button.addEventListener("click", handleOperatorClick));
buttonDecimal.addEventListener("click", handleDecimalClick);