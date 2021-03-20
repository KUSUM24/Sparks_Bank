getProfile = () => {
  let profile = localStorage.getItem("user");
  profile = JSON.parse(profile);
  document.getElementById("nameProfile").innerHTML += " " + profile.name;
  document.getElementById("usernameProfile").innerHTML +=
    " " + profile.username;
  document.getElementById("accountProfile").innerHTML += " " + profile.account;
  document.getElementById("creditsProfile").innerHTML += " " + profile.credits;

  document.getElementById("usernamePro").value = localStorage.getItem("user");
};

//window.href.location = /dashboard?id=locastorage
//if(req.query.id != undefined) res.send => /dashboard/query
//else /dashboard
//cannot set headers (two times res)//error
