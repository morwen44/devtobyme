export const validateSession = () => {
    let hasToken = localStorage.getItem("token");
    let logInBt = document.getElementById("logInBtn");
    let createPostBtn = document.getElementById("createPostBtn");
    let notifications = document.getElementById("notifications");
    let avatar = document.getElementById("avatar");
    let createAccount = document.getElementById("createAccount");
  
    if (!hasToken) {
      createPostBtn.classList.remove("d-md-block");
      avatar.classList.add("d-none");
      notifications.classList.add("d-none");
      logInBt.classList.remove("d-none");
      logInBt.classList.add("d-block");
      createAccount.classList.add("d-md-block");
    } else {
      createPostBtn.classList.add("d-md-block");
      avatar.classList.remove("d-none");
      notifications.classList.remove("d-none");
      logInBt.classList.remove("d-md-block");
      logInBt.classList.add("d-none");
      createAccount.classList.remove("d-md-block");
    }
  };
  
  
export const logOut = () => {
  let logOutBtn = document.getElementById("logOutBtn");
  
  logOutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    validateSession();
  });
}
