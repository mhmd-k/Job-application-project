const form = document.querySelector(".form form");
const inputsArr = document.querySelectorAll(".form-element");
const userName = form.username;
const userNameMsg = document.querySelector("span#username");
const email = form.mail;
const mailMsg = document.querySelector("span#email");
const password = form.password;
const passwordMsg = document.querySelector("span#password");
const confirmPass = form.confirmPassword;
const confirmMsg = document.querySelector("span#confirmPassword");

// display errors function
function displayError(ele, message, notvalidIcon, doneIcon) {
  ele.classList.remove("valid");
  ele.classList.add("not-valid");
  message.classList.add("not-valid");
  notvalidIcon.classList.add("active");
  doneIcon.classList.remove("active");
}

//hide errors function
function hideError(ele, message, notvalidIcon, doneIcon) {
  ele.classList.remove("not-valid");
  ele.classList.add("valid");
  message.classList.remove("not-valid");
  notvalidIcon.classList.remove("active");
  doneIcon.classList.add("active");
}

//validate username function
function validateUserName(name, msg) {
  const userReg = /[a-z]([a-z]|[0-9])+[a-z]/i;
  const notValidIcon = document.querySelectorAll(".fa-xmark")[0];
  const doneIcon = document.querySelectorAll(".fa-check")[0];
  if (name.length > 15 || name.length < 5) {
    msg.innerHTML = `username must be between 5 and 15 characters`;
    displayError(inputsArr[0], msg, notValidIcon, doneIcon);
    return;
  }
  if (name.match(userReg)[0] !== name) {
    if (
      Number.isInteger(parseInt(name[0])) ||
      Number.isInteger(parseInt(name[name.length - 1]))
    ) {
      msg.innerHTML = `the first or last character can't be a number or a special character`;
    } else {
      msg.innerHTML = `username should not contain any special characters`;
    }
    displayError(inputsArr[0], msg, notValidIcon, doneIcon);
    return;
  }
  hideError(inputsArr[0], msg, notValidIcon, doneIcon);
  return name;
}
// trigger the function validateUserName
userName.addEventListener("input", () => {
  validateUserName(userName.value, userNameMsg);
});

// validate email function
function validateEmail(email, msg) {
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const notValidIcon = document.querySelectorAll(".fa-xmark")[1];
  const doneIcon = document.querySelectorAll(".fa-check")[1];
  if (!emailReg.test(email)) {
    displayError(inputsArr[1], msg, notValidIcon, doneIcon);
    return;
  }
  hideError(inputsArr[1], msg, notValidIcon, doneIcon);
  return email;
}
// trigger the function validateEmail
email.addEventListener("input", () => {
  validateEmail(email.value, mailMsg);
});

// validate password function
function validatePassword(password, msg) {
  const notValidIcon = document.querySelectorAll(".fa-xmark")[2];
  const doneIcon = document.querySelectorAll(".fa-check")[2];
  if (password.length < 8) {
    displayError(inputsArr[2], msg, notValidIcon, doneIcon);
    return;
  }
  hideError(inputsArr[2], msg, notValidIcon, doneIcon);
  return password;
}
// trigger the function validatePassword
password.addEventListener("input", () => {
  validatePassword(password.value, passwordMsg);
});

// validate confirmPassword function
function validateConfirmPass(Confirmpass, msg) {
  const notValidIcon = document.querySelectorAll(".fa-xmark")[3];
  const doneIcon = document.querySelectorAll(".fa-check")[3];
  if (Confirmpass !== password.value) {
    displayError(inputsArr[3], msg, notValidIcon, doneIcon);
    return;
  }
  hideError(inputsArr[3], msg, notValidIcon, doneIcon);
  return Confirmpass;
}
// trigger the function validateConfirmPassword
confirmPass.addEventListener("input", () => {
  validateConfirmPass(confirmPass.value, confirmMsg);
});

// submiting form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const request = {
    username: validateUserName(userName.value, userNameMsg),
    email: validateEmail(email.value, mailMsg),
    password: validatePassword(password.value, passwordMsg),
    password_confirmation: validateConfirmPass(confirmPass.value, confirmMsg),
  };
  if (
    request.username === undefined ||
    request.email === undefined ||
    request.password === undefined ||
    request.password_confirmation === undefined
  ) {
    return;
  }
  localStorage.setItem("email", request.email);
  fetch("https://goldblv.com/api/hiring/tasks/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  }).then(() => {
    window.location.href = "./Succeed.html";
  });
});
