function mostrar_senha() {
    var temp = window.document.getElementById("senha")
    if (temp.type === "password") {
        temp.type = "text"
    }
    else {
        temp.type = "password"
    }
}
