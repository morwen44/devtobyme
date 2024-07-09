let logIn = document.getElementById("logAction");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

logIn.addEventListener("click", (event) => {
  event.preventDefault();
  let email = emailInput.value.trim();
  let password = passwordInput.value.trim();

  if (email && password) {
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    localStorage.setItem("token", token);
    window.location.href = "index.html";
  } else {
    alert("Please fill in both email and password.");
  }
});
