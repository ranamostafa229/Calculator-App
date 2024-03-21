const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");
const display_error = document.querySelector(".error_message");
const error_container = document.querySelector(".error_container");

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
  let first_input = input.slice(0);
  let last_input = input.slice(-1);
  let operators = ["+", "-", "*", "/", "%"];

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

    // if (input_array[i].includes(first_input)) {
    //   display_error.innerHTML = "Invalid Input";
    //   error_container.classList.add("active");
    //   setTimeout(() => {
    //     error_container.classList.remove("active");
    //   }, 1000);
    //   return "";
    // }
    if (operators.includes(first_input)) {
      // input_array[i] = "";
      display_error.innerHTML = "Invalid Input";
      error_container.classList.add("active");
      setTimeout(() => {
        error_container.classList.remove("active");
      }, 1000);
      return "";
    }
  }

  return input_array.join("");
}

function formatOutput(output) {
  let output_string = output.toString();
  output_string = output_string.split(".")[0];
  let decimail = output_string.split(".")[1];
  //   let last_input = input.slice(-1);

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
    display_error.innerHTML = "Could not divide by zero";
    error_container.classList.add("active");
    setTimeout(() => {
      error_container.classList.remove("active");
    }, 1000);
    return false;
  }

  return output_array.join("");
}

function validateInput(value) {
  //   let first_input = input.slice(0);
  let last_input = input.slice(-1);
  let operators = ["+", "-", "*", "/", "%"];
  if (value === "." && last_input === ".") {
    return false;
  }
  if (operators.includes(value) && operators.includes(last_input)) {
    return false;
  }
  //   if (operators.includes(first_input)) {
  //     display_error.innerHTML = "Invalid Input";
  //     error_container.classList.add("active");
  //     setTimeout(() => {
  //       error_container.classList.remove("active");
  //     }, 1000);
  //     return "";
  //   }
  return true;
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
