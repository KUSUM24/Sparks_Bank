getPayment = () => {
  let currentUser = localStorage.getItem("user");
  let payUser = localStorage.getItem("payUser");
  currentUser = JSON.parse(currentUser);
  payUser = JSON.parse(payUser);
  console.log(payUser);
  document.getElementById("usernamePay").innerHTML += payUser.username;
  document.getElementById("accPay").innerHTML += payUser.account;
  document.getElementById("displayName").innerHTML =
    currentUser.name + " transferring money to :";

  document.getElementById("current").value = localStorage.getItem("user");
  document.getElementById("payUser").value = localStorage.getItem("payUser");
};
