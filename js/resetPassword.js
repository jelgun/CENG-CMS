let login = document.getElementById('button');
let back = document.getElementById('back');

login.addEventListener('click', () => {
    let email = document.getElementById('email').value;

    if (email == "abc@ma") {
        document.location.href = "../html/login.html";
    } else {
        alert("Wrong Email Address");
    }
});

back.addEventListener('click', () => {
    document.location.href = "../html/login.html";
});