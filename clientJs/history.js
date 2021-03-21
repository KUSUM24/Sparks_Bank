getHistory = () => {
  let currentUser = localStorage.getItem("user");
  currentUser = JSON.parse(currentUser);
  let history = currentUser.history;
  console.log(history);
  let tableHtml = "";
  history.forEach((c) => {
    tableHtml += `<tr>
    <td scope="col" >${c.username}</td>
    <td scope="col" >${c.account}</td>
    <td scope="col">${c.amount}</td>
    <td scope="col">${c.status}</td>
    </tr>`;
  });
  document.getElementById("wholeData").innerHTML = tableHtml;
};
