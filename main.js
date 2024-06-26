const keys = document.querySelectorAll(".key ");
const keysContainer = document.querySelector(".keys");
const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");
const display_error = document.querySelector(".error_message");
const error_container = document.querySelector(".error_container");
const mode_container = document.querySelector(".mode-container");
const light_icon = document.querySelector(".mode-light-container");
const dark_icon = document.querySelector(".mode-dark-container");
const app = document.querySelector(".app");

let isDarkMode = true;
let input = "";
for (let key of keys) {
  const value = key.dataset.key;
  key.addEventListener("click", () => {
    if (value === "clear") {
      input = "";
      display_input.innerHTML = "";
      display_output.innerHTML = "";
    } else if (value === "backspace") {
      input = input.slice(0, -1);
      display_input.innerHTML = formatInput(input);
    } else if (value === "brackets") {
      if (
        input.indexOf("(") === -1 ||
        (input.indexOf("(") !== -1 &&
          input.indexOf(")") !== "-1" &&
          input.lastIndexOf(")") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") !== -1 && input.indexOf(")") === -1) ||
        (input.indexOf("(") !== -1 &&
          input.indexOf(")") !== -1 &&
          input.lastIndexOf(")") < input.lastIndexOf("("))
      ) {
        input += ")";
      }
      display_input.innerHTML = formatInput(input);
    } else if (value === "=") {
      let result = eval(handlePercentage(input));
      display_output.innerHTML = formatOutput(result);
    } else {
      if (validateInput(value)) {
        input += value;
        display_input.innerHTML = formatInput(input);
      }
    }
  });
}

function formatInput(input) {
  let input_array = input.split("");

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] === "*") {
      input_array[i] = `<span class='operator'> x </span>`;
    }
    if (input_array[i] === "/") {
      input_array[i] = `<span class='operator'> ÷ </span>`;
    }
    if (input_array[i] === "+") {
      input_array[i] = `<span class='operator'> + </span>`;
    }
    if (input_array[i] === "-") {
      input_array[i] = `<span class='operator'> - </span>`;
    }
    if (input_array[i] === "(") {
      input_array[i] = `<span class='operator'> ( </span>`;
    }
    if (input_array[i] === ")") {
      input_array[i] = `<span class='operator'> ) </span>`;
    }
    if (input_array[i] === ")") {
      input_array[i] = `<span class='operator'> ) </span>`;
    }

    if (input_array[i] === "%") {
      input_array[i] = `<span class='operator'>%</span>`;
    }
  }
  return input_array.join("");
}

function formatOutput(output) {
  let output_string = output.toString();
  output_string = output_string.split(".")[0];
  let decimail = output_string.split(".")[1];

  let output_array = output_string.split("");
  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ",");
    }
  }
  if (decimail) {
    output_array.push(".");
    output_array.push(decimail);
  }
  if (output_string === "Infinity" || output_string === "NaN") {
    displayErrorMessage("Could not divide by zero");

    return "";
  }

  return output_array.join("");
}

function validateInput(value) {
  let last_input = input.slice(-1);
  let current_char = value.charAt(0);
  let operators = ["+", "*", "/", "%"];

  if (value === "." && last_input === ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(current_char) && isNotNumber(last_input)) {
      displayErrorMessage("Invalid format used");
      return false;
    } else {
      return true;
    }
  }

  return true;
}
function displayErrorMessage(message) {
  display_error.innerHTML = message;
  error_container.classList.add("active");
  setTimeout(() => {
    error_container.classList.remove("active");
  }, 1000);
}
function isNotNumber(value) {
  const validCharacters = ["(", ")"];
  if (value === "" || value === null) {
    return true;
  }
  for (let i = 0; i < value.length; i++) {
    if (isNaN(value[i]) && !validCharacters.includes(value[i])) {
      return true;
    }
  }
  return false;
}
function handlePercentage(input) {
  let input_array = input.split("");

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] === "%") {
      input_array[i] = "/100";
    }
  }
  return input_array.join("");
}

light_icon.addEventListener("click", () => {
  calculator.classList.add("light");
  keysContainer.classList.add("light");
  keys.forEach((key) => {
    key.classList.add("light");
    key.classList.remove("dark");
  });
  calculator.classList.remove("dark");
  keysContainer.classList.remove("dark");
  mode_container.classList.add("light");
  mode_container.classList.remove("dark");
  display.classList.add("light");
  display.classList.remove("dark");
  light_icon.classList.add("show");
  dark_icon.classList.remove("show");
  app.classList.add("light");
  app.classList.remove("dark");
  isDarkMode = false;
});
isDarkMode
  ? dark_icon.classList.add("show") & app.classList.add("dark")
  : app.classList.add("light");
isDarkMode
  ? calculator.classList.add("dark")
  : calculator.classList.remove("dark");
dark_icon.addEventListener("click", () => {
  calculator.classList.add("dark");
  keysContainer.classList.add("dark");
  keys.forEach((key) => {
    key.classList.add("dark");
    key.classList.remove("light");
  });
  calculator.classList.remove("light");
  keysContainer.classList.remove("light");
  mode_container.classList.add("dark");
  mode_container.classList.remove("light");
  display.classList.add("dark");
  display.classList.remove("light");
  light_icon.classList.remove("show");
  dark_icon.classList.add("show");
  app.classList.add("dark");
  isDarkMode = true;
});
