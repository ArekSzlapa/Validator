const username = document.querySelector("#username");
const pass = document.querySelector("#password");
const pass2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const send = document.querySelector(".send");
const clear = document.querySelector(".clear");
const popup = document.querySelector(".popup");
const form = [username, pass, pass2, email];

function checkForm(input) {
  input.forEach((el) => {
    if (el.value === "") {
      showError(el, el.placeholder);
    } else {
      clearError(el);
    }
  });
}
function sendForm(e) {
  e.preventDefault();
  checkForm(form);
  checkLength(username, 3);
  checkLength(pass, 8);
  checkPassword(pass, pass2);
  mailValidation(email);
  checkErrors();
}
function showError(input, msg) {
  const formBox = input.parentElement;
  const errorMsg = formBox.querySelector(".error-text");
  formBox.classList.add("error");
  errorMsg.textContent = msg;
}

function clearForm(e) {
  e.preventDefault();
  form.forEach((el) => {
    el.value = "";
    clearError(el);
  });
}

function clearError(input) {
  const formBox = input.parentElement;
  formBox.classList.remove("error");
}

function checkLength(input, min) {
  if (input.value.length < min) {
    showError(
      input,
      `${input.previousElementSibling.innerText.slice(
        0,
        -1
      )} consists of min. ${min} characters`
    );
  }
}

function checkPassword(input, input2) {
  if (input.value !== input2.value) {
    showError(input2, "Passwords does not match!");
  }
}

function mailValidation(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value)) {
    clearError(email);
  } else {
    showError(email, "The provided email adress is not correct!");
  }
}

function checkErrors() {
  const allInputs = document.querySelectorAll(".form-box");
  let errorCount = 0;

  allInputs.forEach((el) => {
    if (el.classList.contains("error")) {
      errorCount++;
    }
    return errorCount;
  });
  if (errorCount === 0) {
    popup.classList.add("show-popup");
  }
}

clear.addEventListener("click", clearForm);
send.addEventListener("click", sendForm);
