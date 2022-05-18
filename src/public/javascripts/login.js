function showPassword() {
  var temp = window.document.getElementById("password");
  if (temp.type === "password") {
    temp.type = "text";
  } else {
    temp.type = "password";
  }
}
