let result = [];
payUser = (account) => {
  console.log(account);
  result.forEach((c) => {
    if (c.account == account) {
      localStorage.setItem("payUser", JSON.stringify(c));
      console.log(c);
    }
  });
  window.location.href = "/payment"; // re-direct from frontend
  // document.getElementsByTagName() // learn
};
getData = async () => {
  let user = document.getElementById("user").innerHTML;
  localStorage.setItem("user", user);
  user = JSON.parse(user);
  document.getElementById("d-name").innerHTML = "Welcome " + user.name;
  console.log(user.name);

  result = document.getElementById("mongo").innerHTML;
  let tableBody = document.getElementById("wholeData");
  const tableHtml = "";
  result = JSON.parse(result);
  console.log(result);
  let ans = [];
  result = result.reverse();
  localStorage.setItem("result", JSON.stringify(result));
  await result.forEach((c) => {
    //await doubt
    ans.push(
      `<tr id=${c.username}><td>${c.username}</td><td>${c.account}</td><td><button class = 'btn btn-info' onclick = "payUser(${c.account})">Pay</button><button class = 'btn btn-light m-1 ml-4'>Request</button></td></tr>`
    );
  });
  ans = ans.join("");
  console.log(ans);
  tableBody.innerHTML = ans; //mistaken once
};
