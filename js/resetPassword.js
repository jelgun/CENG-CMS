let login = document.getElementById('button');

login.addEventListener('click', () => {
    let email = document.getElementById('email').value;

    if (email == "abc@ma") {
        document.location.href = "../html/login.html";
    } else {
        alert("Wrong Email Address");
    }
});