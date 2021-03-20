goBack = () => {
  let currentUser = localStorage.getItem("user");
  currentUser = JSON.parse(currentUser);
  console.log(currentUser._id);
  window.location.href = `/dashboard?id=${currentUser._id}`;
};
